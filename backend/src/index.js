const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(cors());
app.use(express.json());

// Example route
app.get("/", async (req, res) => {
  const { data, error } = await supabase.from("teams").select("*");
  if (error) return res.status(500).send(error);
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
