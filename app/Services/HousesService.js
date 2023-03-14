import { appState } from "../AppState.js"
import { Car } from "../Models/Car.js"
import { House } from "../Models/House.js"



// @ts-ignore
const sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api',
  timeout: 3000
})

class HousesService {
  async getAllHouses() {
    const res = await sandbox.get('houses')
    console.log('[Got All Houses]', res.data)
    appState.houses = res.data.map(house => new House(house))
  }

  async createHouse(formData) {
    console.log(formData)
    const res = await sandbox.post('houses', formData)
    console.log("creating house", res.data);
    const newHouse = new House(formData)
    appState.houses.push(newHouse)
    appState.emit('houses')
  }

  async deleteHouse(id) {
    const res = await sandbox.delete(`houses/${id}`)
    console.log("deleting", res.data);
    appState.houses = appState.houses.filter(house => house.id != id)
  }

  async editHouse(id, editData) {
    const res = await sandbox.put(`houses/${id}`, editData)

    const index = appState.houses.findIndex(house => house.id == id)
    appState.houses.splice(index, 1, new House(res.data))
    appState.emit('houses')
  }

}

export const housesService = new HousesService()