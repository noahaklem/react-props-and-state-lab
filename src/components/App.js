import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  fetchPets = () => {
    let url = "/api/pets"

    if (this.state.filters.type !== 'all') {
      url = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(url)
    .then(results => results.json())
    .then(pets => this.setState({pets : pets}))
  }
  

  onChangeType = (e) => {
    const event = e.target.value
    this.setState({
      filters: {...this.state.filters, type: event}
    })
  }

  onAdoptPet = (petId) => {
    const pets = this.state.pets.map((pet) => {
      if(pet.id === petId) {
        return {...pet, isAdopted: true}
      } else {
        return pet
      }
    })
    this.setState({
      pets: pets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onChangeType={this.onChangeType}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets} 
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
