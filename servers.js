const { app } = require("./app");
const agridirect = require("./routes/agridirect");

app.use("/api/agridirect", agridirect);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});