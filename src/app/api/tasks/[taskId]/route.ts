import { NextApiRequest, NextApiResponse } from "next";

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const taskId = res.status(200).json({ id: "1" });
};
