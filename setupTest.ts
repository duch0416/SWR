import '@testing-library/jest-dom/extend-expect'
import { server } from './server'

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());