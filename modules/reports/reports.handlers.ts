import { getApiUrl } from 'api/helpers/getApiUrl'
import { Item } from 'api/reports'
import { rest, RestRequest } from 'msw'

type DataMapKey = '1' | '2'
let dataMap: { "1": Item[], "2": Item[] } = { '1': [{ name: 'name1', id: '1' }, { name: 'name2', id: '2' }], '2': [{ name: 'name1', id: '1' }, { name: 'name2', id: '2' }] }

export const reportsHandlers = [
  rest.get(getApiUrl('/reports'), (req, res, ctx) => {
    const params = req.url.searchParams;
    const search = params.get('search') ?? ''
    const page = params.get('page')
    const reportId = params.get('reportId') as DataMapKey
    const pageNumber = page ? parseInt(page) : 1;

    const offset = pageNumber === 1 ? 0 : (pageNumber - 1) * 3;

    const newData = dataMap?.[reportId].filter(({ name }) => {
      if (search) {
        return name.includes(search)
      }

      return true
    }).slice(offset, offset + 3)

    return res(
      ctx.json({
        data: newData
      }),
    )
  }),
  rest.post(getApiUrl('/reports/:reportId'), (req: RestRequest<Item>, res, ctx) => {
    const { reportId } = req.params
    let prevData = dataMap[reportId as DataMapKey]

    const dataClone = [...prevData]
    const newData = [...dataClone, req.body]

    dataMap[reportId as DataMapKey] = newData;

    return res(
      ctx.json(req.body),
    )
  }),
  rest.delete(getApiUrl('/reports/:reportId'), (req, res, ctx) => {
    const { reportId } = req.params
    const id = (req.body as any).id
    let prevData = dataMap[reportId as DataMapKey]

    const dataClone = [...prevData]
    const newData = dataClone.filter((i) => i.id !== id)

    dataMap[reportId as DataMapKey] = newData;

    return res(
      ctx.json({ id: id }),
    )
  })
]
