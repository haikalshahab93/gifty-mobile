import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../Utils/Colors'

export default function ChapterSection({ chapterList }) {
    return (
        <View style={{padding:10,backgroundColor:Colors.WHITE,marginTop:20,borderRadius:15}}>
            <Text style={{fontFamily:'outfit-medium', fontSize:22}}>Chapters</Text>
            {chapterList.map((item, index) => (
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderWidth: 1, borderRadius: 10, marginTop: 10, borderColor: Colors.GRAY }}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Text style={{ fontFamily: 'outfit-medium', fontSize: 27, borderColor: Colors.GRAY }}>{index + 1}</Text>
                        <Text style={{ fontFamily: 'outfit', fontSize: 21, borderColor: Colors.GRAY }}>{item.title}</Text>
                    </View>
                    <Ionicons name='md-lock-closed' size={25} color={Colors.GRAY} />
                </View>
            ))}
        </View>
    )
}