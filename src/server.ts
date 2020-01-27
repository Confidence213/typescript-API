import app from "./app";
import { PORT } from "./constants/app.constant";

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
