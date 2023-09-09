import app from "./app.js";

const port = process.env.PORT || 5005;

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
