import React, { PureComponent } from 'react'

import TopicFilter from './topicFilter/topicFilter'
import SearchBox from './searchBox/searchBox'
import './filterBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortNumericUpAlt,faSortNumericDownAlt,faFireAlt} from '@fortawesome/free-solid-svg-icons'
class FilterBar extends PureComponent{
    state={
      dropdownShow:false,
      
    }
    dropdownHandler=()=>{
        this.setState({dropdownShow:!this.state.dropdownShow})
        
    }
   
    render(){
        return(
        <div className='filterBar'>
            <TopicFilter 
            topic={this.props.topic}
            show={this.state.dropdownShow} 
            clicked={this.dropdownHandler}
            selectTopic={(topic)=>{
                // 
                this.props.selectTopic(topic)
                this.setState({dropdownShow:!this.state.dropdownShow})
                
            }}
            /> 
            
            <SearchBox 
            searchContent={this.props.searchContent} 
            changeContent={this.props.changeContent}  
            searchHandler={this.props.searchHandler}
            />
            <div className='filterBar__filter'>
                <div>
                    <FontAwesomeIcon 
                    className='filterBar__filter-icon' 
                    icon={faSortNumericUpAlt}
                    onClick={this.props.load}
                    />
                </div>
                <div>
                    <FontAwesomeIcon className='filterBar__filter-icon' 
                    icon={faSortNumericDownAlt}
                    onClick={this.props.loadReverse}
                    />
                </div>
                <div>
                    <FontAwesomeIcon 
                    className='filterBar__filter-icon' 
                    icon={faFireAlt}
                    onClick={this.props.loadPopular}
                    />
                </div>
                
                
                
            </div>
        </div>
    )}
}
export default FilterBar;