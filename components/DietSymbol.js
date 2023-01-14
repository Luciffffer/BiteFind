//SVGs
import DairyFreeSymbol from '../assets/images/icons/dairy-free-symbol.svg';
import VegetarianSymbol from '../assets/images/icons/vegetarian-symbol.svg';
import VeganSymbol from '../assets/images/icons/vegan-symbol.svg';
import GlutenFreeSymbol from '../assets/images/icons/gluten-free-symbol.svg';

const DietSymbol = props => { // This code is really messy but it was difficult to find a better way. Especially with the restricted time
    
    switch (props.id) {
        case 4:
            return <DairyFreeSymbol width={props.height} height={props.height} />
            break;
        case 5:
            return <VegetarianSymbol width={props.height} height={props.height} />
            break;
        case 6:
            return <GlutenFreeSymbol width={props.height} height={props.height} />
            break;
        case 3:
            return <VeganSymbol width={props.height} height={props.height} />
            break;
    }
    
}

export default DietSymbol;