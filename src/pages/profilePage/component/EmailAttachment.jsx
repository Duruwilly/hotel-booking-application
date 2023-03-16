import React from "react";

const EmailAttachment = ({
  ind,
  setAttachmentState,
  attachmentState,
  userDetails,
  setUserDetails,
}) => {
  return (
    <div key={ind}>
      <div className="">
        <input
          type="email"
          id="email"
          name={`att-${ind}`}
          value={attachmentState.otherEmail}
          className="form-input"
          required
          onChange={(e) => {
            let idArr = e.target.name.split("-");
            console.log(userDetails.otherEmail);
            // console.log({
            //   attachment: e.target.value ? e.target.value : {},
            // });
            // return setUserDetails((state) => {
            //   return {
            //     ...state,
            //     otherEmail: [
            //       ...state.otherEmail,
            //       {
            //         key: parseInt(idArr[1]),
            //         value: e.target.value ? e.target.value : null,
            //       },
            //     ],
            //   };
            // });

            return setUserDetails((state) => {
              let prevAttachments = state.otherEmail;

              const indexOfAttachment = prevAttachments.findIndex(
                (att) => att?.key === parseInt(idArr[1])
              );
              if (indexOfAttachment >= 0) {
                prevAttachments[indexOfAttachment].value = e.target.value
                  ? e.target.value
                  : null;
              } else {
                prevAttachments = [
                  ...state.otherEmail,
                  {
                    key: parseInt(idArr[1]),
                    value: e.target.value ? e.target.value : null,
                  },
                ];
              }
              console.log(userDetails.otherEmail);
              return {
                ...state,
                otherEmail: prevAttachments,
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
                emailAttachments: state.emailAttachments.filter(
                  (item, index) => parseInt(targetBtn[1]) !== item.key
                ),
              };
            });

            setAttachmentState((state) => {
              return {
                ...state,
                emailAttachments: state.emailAttachments.filter(
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

export default EmailAttachment;
