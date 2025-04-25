export async function POST(req, res) {
    try {
      const callbackData = req.body
      console.log(callbackData);      
      return Response.json(callbackData)
    } catch (error) {
      console.log(error.message);
      return Response.json({error:error.message})
    }
  }
  