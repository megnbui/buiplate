import express from 'express'
import path from 'path'
import routes from './routes'

const PORT = process.env.PORT || 3000

const app = express()
routes(app)
app.use(express.static(path.resolve(__dirname, '../dist')))

app.listen(PORT, (err) => {
  if (err) return console.error(err.message)
  console.log(`App running at http://localhost:${ PORT }`)
})
