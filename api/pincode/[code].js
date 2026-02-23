import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  const { code } = req.query;
  const { data, error } = await supabase
    .from("pincodes")
    .select("*")
    .eq("pincode", Number(code));
  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ message: "Database error" });
  }


  if (!data || data.length === 0) {
    return res.status(404).json({ message: "Pincode not found" });
  }
  return res.status(200).json(data);
}