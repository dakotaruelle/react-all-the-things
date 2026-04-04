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