import React from 'react';

class Type extends React.Component{
    
    render(){
        return(
            <div className="type">
                {   this.props.typeInfo != null &&
                    <h2>{this.props.typeInfo.name}</h2>
                }
            </div>
        )
    }
}

export default Type;