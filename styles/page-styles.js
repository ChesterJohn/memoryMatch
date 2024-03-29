import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingTop: 40,
        paddingBottom: 40,
    },
    flexRow: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        flex: 1,
        height: 48,
        margin: 16,
    },
    itemStyle: {
        borderWidth: 2,
        backgroundColor: 'white',
        padding: 10,
        margin: 6,
    },
    itemText: {
        fontSize: 15,
    },
    listArea: {
        backgroundColor: '#f0f0f0',
        width: '80%',
    },
    sectionHeading: {
        fontSize: 18,
        marginBottom: 8,
    },
});
export default styles;