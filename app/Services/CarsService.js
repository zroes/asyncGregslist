import { appState } from "../AppState.js"
import { Car } from "../Models/Car.js"

// @ts-ignore
const sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api',
  timeout: 10000
})

class CarsService {
  async createCar(formData) {
    // -----------------------------⬇️ endpoint
    // --------------------------------------⬇️ body (our data being sent up)
    const res = await sandbox.post('cars', formData)
    console.log('[Creating Car]', res.data)
    const newCar = new Car(res.data)
    appState.cars.push(newCar)
    appState.emit('cars')
  }

  async getAllCars() {
    // const res = await axios.get('https://bcw-sandbox.herokuapp.com/api/cars')
    const res = await sandbox.get('cars')
    console.log('[Got All Cars]', res.data)
    appState.cars = res.data.map(car => new Car(car))
    console.log(appState.cars)
  }
  async deleteCar(id) {
    const res = await sandbox.delete(`cars/${id}`) // the id of the car we want to delete tells the api which car from cars has to go
    console.log('[Deleting Car]', res.data)
    // this.getAllCars() // this will update the cars but not the best way to handle it
    appState.cars = appState.cars.filter(car => car.id != id)
  }

  async updateCar(id, editData) {
    const res = await sandbox.put(`cars/${id}`, editData)
    console.log('[Editing Car]', res.data)

    const updateIndex = appState.cars.findIndex(car => car.id == id) // gives us position of edited car in the appstate array
    appState.cars.splice(updateIndex, 1, new Car(res.data)) // splice will remove the car at that index and replace it with the new car
    appState.emit('cars')
  }

}

export const carsService = new CarsService()