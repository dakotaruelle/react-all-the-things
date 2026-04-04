```
return (
  <View style={{ flex: 1 }}>
    <Text>Hello</Text>
  </View>
);

```

```
return React.createElement(
  View,
  { style: { flex: 1 } },
  React.createElement(Text, null, "Hello")
);
```

- View is a component, mapped to platform native components
  - <ViewGroup> on Android
  - <UIView>
  - <div> on the web
