const CheckBox = ({title, state, onChange, customClass}) => {
    return(
        <div className={customClass}>
            <input 
            type="checkbox" name="" id="" 
            checked={state} 
            onChange={onChange} 
            />
            <label htmlFor="">{title}</label>
       </div>
    );
}

export default CheckBox;