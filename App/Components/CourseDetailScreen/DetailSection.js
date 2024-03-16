import { View, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import OptionsItem from './OptionsItem'


export default function DetailSection({ course,enrollCourse }) {
    return (
        <View style={{ paddimg: 10, borderRadius: 15, backgroundColor: Colors.WHITE }}>
            <Image source={{ uri: course?.banner?.url }} style={{ width: Dimensions.get('screen').width * 0.9, height: 190, borderRadius: 15 }} />
            <View style={{padding:10}}>
                <Text style={{ fontSize: 22, fontFamily: 'outfit-medium', marginTop: 1 }}>{course.name}</Text>

                <View>
                    <View style={styles.rowStyle}>
                        <OptionsItem icon={'book-outline'} value={course.chapters?.length + ' Chapter'} />
                        <OptionsItem icon={'md-time-outline'} value={course.time} />
                    </View>

                    <View style={styles.rowStyle}>
                        <OptionsItem icon={'person-circle-outline'} value={course?.author} />
                        <OptionsItem icon={'cellular-outline'} value={course.level} />
                    </View>
                </View>
                <View>
                    <Text style={styles.HeadertextStyle}>Description</Text>
                    <Text style={styles.textStyle}>{course.description?.markdown}</Text>
                </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',gap:20}}>
                <View>
                    <TouchableOpacity onPress={()=>enrollCourse()} style={{padding:15,backgroundColor:Colors.PRIMARY,borderRadius:15}}>
                        <Text style={{fontFamily:'outfit',color:Colors.WHITE,textAlign:'center',fontSize:17}}>Enroll For Free</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{padding:15,backgroundColor:Colors.LIGHT_PRIMARY,borderRadius:15}}>
                        <Text style={{fontFamily:'outfit',color:Colors.WHITE,textAlign:'center',fontSize:17}}>Membership $ 2.99/Mon</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    rowStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,

    },
    HeadertextStyle:{
        fontFamily:'outfit-medium',
        fontSize:20
    }
,
    textStyle:{
        fontFamily:'outfit',
        color:Colors.LIGHT_PRIMARY,
        lineHeight:15


    }

})