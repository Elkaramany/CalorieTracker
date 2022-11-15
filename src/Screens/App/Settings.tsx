import React from 'react'
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

import { ResetAuthReducer } from '../../Redux/Actions';

import { Container, Button } from '../../Components';
import { GlobalStyles } from '../../Config';

const Index: React.FC<{}> = () => {
    const dispatch = useDispatch()

    return (
        <Container>
            <View style={[GlobalStyles.centeredContainer, { flex: 1 }]}>
                <Button text='Sign Out' onPress={() => ResetAuthReducer(dispatch)} />
            </View>

        </Container>
    )
}

export default Index;