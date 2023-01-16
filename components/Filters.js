import { ScrollView, StyleSheet } from 'react-native';

// components
import FilterItem from '../components/Filter';

const Filters = ({setActiveFilters, filters, activeFilters}) => {
    
    const onFilterPress = (id, active) => {
        if (active) {
            setActiveFilters((prev) => [...prev, id]);
        } else if (!active) {
            let newArray = [...activeFilters];
            newArray.splice(newArray.indexOf(id), 1)
            setActiveFilters([...newArray]); 
        }
    }

    return (
        <ScrollView 
            style={styles.filterRow} 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ //styling of child container of the scrollview component
                paddingHorizontal: 15,
            }}
        >
            {filters.map((filter, i) => (
                <FilterItem 
                    key={filter.id} 
                    id={filter.id} 
                    name={filter.name} 
                    isLast={i + 1 === filters.length ? true : false}
                    onFilterPress={onFilterPress}
                />  
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    filterRow: {
        width: "100%",
        marginVertical: 10,
        flexGrow: 0,
    },
})

export default Filters;
