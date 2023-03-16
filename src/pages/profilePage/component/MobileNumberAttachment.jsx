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
            let idArr = e.target.name.split("-");
            return setUserDetails((state) => {
              let prevAttachments = state.otherMobileNumber;

              const indexOfAttachment = prevAttachments.findIndex(
                (att) => att?.key === parseInt(idArr[1])
              );
              if (indexOfAttachment >= 0) {
                prevAttachments[indexOfAttachment].value = e.target.value
                  ? e.target.value
                  : null;
              } else {
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
            // console.log({
            //   attachment: e.target.value ? e.target.value : {},
            // });
            // return setUserDetails((state) => {
            //   return {
            //     ...state,
            //     otherMobileNumber: [
            //       ...state.otherMobileNumber,
            //       {
            //         key: parseInt(idArr[1]),
            //         value: e.target.value ? e.target.value : null,
            //       },
            //     ],
            //   };
            // });
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
