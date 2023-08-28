const React = {
  createElement: (tag, props, ...children) => {
    if (typeof tag == "function") {
      try {
        return tag(props);
      } catch ({ promise, key }) {
        promise.then((data) => {
          promiseCache.set(key, data);
          reRender();
        });

        return { tag: "h1", props: { children: ["...Loading"] } };
      }
    }

    const element = { tag, props: { ...props, children } };
    return element;
  },
};

const render = (reactElementOrPrimitive, container) => {
  if (["string", "number"].includes(typeof reactElementOrPrimitive)) {
    const textNode = document.createTextNode(String(reactElementOrPrimitive));
    container.appendChild(textNode);
    return;
  }

  const realElement = document.createElement(reactElementOrPrimitive.tag);

  if (reactElementOrPrimitive.props) {
    Object.keys(reactElementOrPrimitive.props)
      .filter((p) => p !== "children")
      .forEach((p) => (realElement[p] = reactElementOrPrimitive.props[p]));
  }

  if (reactElementOrPrimitive.props.children) {
    reactElementOrPrimitive.props.children.forEach((c) =>
      render(c, realElement)
    );
  }

  container.appendChild(realElement);
};

const reRender = () => {
  stateCursor = 0;
  document.querySelector("#app").firstChild.remove();
  render(<App />, document.querySelector("#app"));
};

const stateStore = [];
let stateCursor = 0;

const useState = (initialState) => {
  const fixedCursor = stateCursor;
  stateStore[fixedCursor] = stateStore[fixedCursor] || initialState;
  const setState = (newState) => {
    stateStore[fixedCursor] = newState;
    reRender();
  };
  stateCursor++;
  return [stateStore[fixedCursor], setState];
};

const promiseCache = new Map();

const createResource = (promise, key) => {
  if (promiseCache.has(key)) {
    return promiseCache.get(key);
  }

  throw { promise, key };
};

const MyComponent = ({ key, initialValue, ...otherProps }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <div>
      <label for={key}></label>
      <input
        id={key}
        value={value}
        onchange={(e) => setValue(e.target.value)}
        {...otherProps}
      />
      <p>{value}</p>
    </div>
  );
};

const MyAsyncComponent = () => {
  const dogPhotoUrl = createResource(
    fetch("https://dog.ceo/api/breeds/image/random")
      .then((r) => r.json())
      .then((data) => data.message),
    "dogPhotoUrl"
  );

  return <img src={dogPhotoUrl}></img>;
};

const App = () => {
  const [name, setName] = useState("Person");
  const [count, setCount] = useState(0);

  return (
    <div className={"react"}>
      <h1>Hello, {name}</h1>
      <input
        value={name}
        onchange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Write your name"
      />
      <h2>Contagem é {count}</h2>
      <button onclick={() => setCount(count + 1)}>+</button>
      <button onclick={() => setCount(count - 1)}>-</button>
      <MyComponent key="some-info" initialValue="Some Info" />
      <MyComponent key="another-info" initialValue="Another Info" />
      <MyAsyncComponent />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta dolorem
        tenetur quos ipsam dolore explicabo consequatur vero architecto corrupti
        id! Obcaecati cupiditate pariatur officia, doloremque sequi quia nulla
        modi quo?
      </p>
    </div>
  );
};

render(<App />, document.querySelector("#app"));
