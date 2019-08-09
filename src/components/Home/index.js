import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchData } from '../../store'
import content from './content.json'

class ListData extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    return <Home { ...this.state } />
  }
}

ListData.propTypes = {
}

const mapStateToProps = ({ list }) => ({
  list,
})

const mapDispatchToProps = {
  fetchData,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListData)

class Home extends React.Component {
  componentDidMount () {
    if (this.props.items.length <= 0) {
      this.props.fetchData()
    }
  }

  render () {
    return (
            <section>
                <h1>{content.title}</h1>
                <p>{content.description}</p>
                <ul>
                  { Object.entries(content.values).map(([value, desc]) => (
                    <li key={value}>
                      <h2>{value}</h2>
                      <p>{desc}</p>
                    </li>
                  ))}
                </ul>
            </section>
    )
  }
}

Home.propTypes = {
  items: PropTypes.array,
  fetchData: PropTypes.func,
}

Home.serverFetch = fetchData // static declaration of data requirements
