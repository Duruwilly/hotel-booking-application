import React from "react";

const MobileNumberAttachment = ({
  ind,
  setAttachmentState,
  attachmentState,
  handleChange,
  userDetails,
  setUserDetails,
}) => {
  return (
    <div key={ind}>
      <div className="">
        <input
          type="tel"
          id="mobileNumber"
          name={`att-${ind}`}
          value={userDetails.otherMobileNumber.value}
          className="form-input"
          required
          onChange={(e) => {
            // spilt the id to get the number
            let idArr = e.target.name.split("-");
            return setUserDetails((state) => {
              // get the content of the array
              let prevAttachments = state.otherMobileNumber;
              // find the index of the of the object in the array
              const indexOfAttachment = prevAttachments.findIndex(
                (att) => att?.key === parseInt(idArr[1])
              );
              // if the index is greater than or equal to 0 find the value of the index of that object in the array
              // if equal to e.target.value return it else null
              if (indexOfAttachment >= 0) {
                prevAttachments[indexOfAttachment].value = e.target.value
                  ? e.target.value
                  : null;
              } else {
                // if the index of the attachment is less than 1, then create an array with the key of 1 which is the idArr and the value in the input
                prevAttachments = [
                  ...state.otherMobileNumber,
                  {
                    key: parseInt(idArr[1]),
                    value: e.target.value ? e.target.value : null,
                  },
                ];
              }
              return {
                ...state,
                otherMobileNumber: prevAttachments,
              };
            });
          }}
        />
      </div>
      <div className="">
        <button
          className="text-red-900 font-semibold text-sm cursor-pointer"
          type="button"
          id={`rmvbtn-${ind}`}
          onClick={(e) => {
            let targetBtn = e.target.id.split("-");
            setAttachmentState((state) => {
              return {
                ...state,
                mobileNumberAttachments: state.mobileNumberAttachments.filter(
                  (item, index) => parseInt(targetBtn[1]) !== item.key
                ),
              };
            });

            setAttachmentState((state) => {
              return {
                ...state,
                mobileNumberAttachments: state.mobileNumberAttachments.filter(
                  (item, index) => parseInt(targetBtn[1]) !== item.key
                ),
              };
            });
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default MobileNumberAttachment;
