import { getApiUrl } from 'api/helpers/getApiUrl'
import { Item } from 'api/reports'
import { rest, RestRequest } from 'msw'

let data: Item[] = [{ name: 'name1', id: '1' }, { name: 'name2', id: '2' }]

export const reportsHandlers = [
  rest.get(getApiUrl('/reports'), (req, res, ctx) => {

    return res(
      ctx.json({
        data: data
      }),
    )
  }),
  rest.post(getApiUrl('/reports'), (req: RestRequest<Item>, res, ctx) => {
    const dataClone = [...data]
    data = [...dataClone, req.body]

    return res(
      ctx.json(req.body),
    )
  }),
  rest.delete(getApiUrl('/reports/:id'), (req, res, ctx) => {
    const { id } = req.params

    const dataClone = [...data]
    data = dataClone.filter((i) => i.id !== id)

    return res(
      ctx.json({}),
    )
  })
]
