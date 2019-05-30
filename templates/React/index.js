import React from './node_modules/react'
import styled from './node_modules/styled-components'
import { Flex, Text, Image } from './node_modules/rebass'
import { size, position } from './node_modules/polished'
import { connect } from './node_modules/react-redux'

const Root = styled(Flex)``

class App extends React.Component {
    render() {
        return (
            <Root></Root>
        )
    }
}

export default App