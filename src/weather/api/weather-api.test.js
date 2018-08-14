import API from './weather-api'

describe('weather-api', () => {
  const env = {
    REACT_APP_API_URL: 'http://api.com',
    REACT_APP_API_KEY: 'ABC&*(8'
  }

  process.env = Object.assign(process.env, env)
  
  it('should return URL', () => {
    expect(API.URL).toEqual(`${env.REACT_APP_API_URL}/weather`)
  })
  
  it('should return KEY', () => {
    expect(API.KEY).toEqual(env.REACT_APP_API_KEY)
  })
})