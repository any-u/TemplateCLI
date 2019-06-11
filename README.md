# TCLI
`create-template-cli` 帮助快速生成`Vue`或`React`模板文件

# Installation
```
npm install -g create-template-cli
```

# Usage
* React
```
tcli create src index.js
tcli create src index.js header.js
```
> Result
```
import React from 'react'
import styled from 'styled-components'
import { Flex } from 'rebass'
import { size } from 'polished'
import { connect } from 'react-redux'

const Root = styled(Flex)``

class App extends React.Component {
    render() {
        return (
            <Root></Root>
        )
    }
}

export default App
```
* Vue
```
tcli create src index.vue
tcli create src index.vue header.vue
```
> result
```
<template>
    <div class="wrapper">

    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {

        }
    },
    mounted() {
        
    },
    methods: {

    }
}
</script>


```

## More
* [TCli](https://marketplace.visualstudio.com/items?itemName=sillyY.tcli) - VSCode 插件  
支持自定义模板，快捷创建模板文件

## License
MIT