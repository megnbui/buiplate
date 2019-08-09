import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Header = ({ loggedIn }) => (
    <div>
        <Link to='/'>Home</Link>
    </div>
)

Header.propTypes = {
  loggedIn: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  loggedIn: state.loggedIn,
})

export default connect(mapStateToProps)(Header)
