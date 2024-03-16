import { View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCourseList } from '../../Services'
import SubHeading from '../SubHeading';

import CourseItem from './CourseItem';
import { useNavigation } from '@react-navigation/native';

export default function CourseList({ level }) {

    const [courseList, setCourseList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getCourse();
    }, [])

    const getCourse = () => {
        getCourseList(level).then(resp => {
            console.log("Res", resp);
            setCourseList(resp?.courses)
        })
    }
    return (
        <View>
            <SubHeading text='Basic Course' />
            <FlatList
                data={courseList}
                key={courseList.id}
                horizontal={true}
                showHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('course-detail',{
                      course:item  
                    })}>
                        <CourseItem item={item} />
                    </TouchableOpacity>

                )}
            />
        </View>
    )
}