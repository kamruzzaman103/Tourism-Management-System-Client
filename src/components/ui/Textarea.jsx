const Textarea = ({ label, ...props }) => {
    return (
      <div className="form-control w-full">
        {label && <label className="label"><span className="label-text">{label}</span></label>}
        <textarea
          className="textarea textarea-bordered w-full"
          {...props}
        />
      </div>
    );
  };
  
  export default Textarea;
  