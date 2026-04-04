```
return (
  <div className="box">
    <h1>Hello</h1>
    <p>World</p>
  </div>
);
```

```
return React.createElement(
  "div",
  { className: "box" },
  React.createElement("h1", null, "Hello"),
  React.createElement("p", null, "World")
);
```

```
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";

return _jsxs("div", {
  className: "box",
  children: [
    _jsx("h1", { children: "Hello" }),
    _jsx("p", { children: "World" })
  ]
});
```