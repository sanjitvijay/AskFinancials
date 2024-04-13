const {GoogleGenerativeAI} = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_API_KEY)

export default genAI