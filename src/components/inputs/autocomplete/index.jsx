import { Close } from "@carbon/icons-react";
import {
  Autocomplete as MuiAutoComplete,
  Chip,
  Input,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import InputField from "../InputField";



export const AutoComplete = ({
  label,
  options = [],
  getOptionLabel ,
  url,
  name,
  onChange,
  value,
  ...otherProps
})=> {
  let textFieldConfig = {
    fullWidth: true,
    sx: {
      "& .MuiInputBase-root": {
        padding: "7px 10px",
      },
      ...otherProps.sx,
    },
    ...otherProps,
  };

  let setFieldValue;
  let setFieldTouched
  if (name) {
    //eslint-disable-next-line
    const [field, meta] = useField(name || "");
    //eslint-disable-next-line
    const ctx = useFormikContext();
  

    setFieldValue = ctx.setFieldValue;
    setFieldTouched = ctx.setFieldTouched;
    textFieldConfig = {
      ...field,
      ...textFieldConfig,
    };
    if (meta && meta.touched && meta.error) {
      textFieldConfig.error = true;
      textFieldConfig.helperText = meta.error;
    }
  }

  const onChangeInner = (e, value, option) => {
    if (onChange) {
      return onChange(e, value, option);
    }
    if (name && setFieldValue) {
      setFieldValue(name, value);
      setFieldTouched(name, true, true);
    }
  };

  return (
    <MuiAutoComplete
    {...textFieldConfig}
      options={ options || []}
      getOptionLabel={option =>option.name }
      size={"small"}
      className='text-dark'
      value={textFieldConfig.value || value}
      onChange={onChangeInner}
      onBlur={() => {
        name && setFieldTouched(name, true, true);
      }}
    //   renderTags={(tagValue, getTagProps) => {
    //     return tagValue.map(
    //       (option, index) =>
    //         option && (
    //           <Chip
    //             {...getTagProps({ index })}
    //             className='mb-2 mr-2'
    //             label={getOptionLabel(option)}
    //             deleteIcon={<Close size={"16"} fill={"#ff0000"} />}
    //           />
    //         )
    //     );
    //   }}
      renderInput={(params) => (
        <div ref={params.InputProps.ref}>
          <Input
            label={label}
            {...params}
            error={textFieldConfig?.error}
            helperText={textFieldConfig?.helperText}
            inputProps={{
              ...params.inputProps,
            }}
            InputLabelProps={{ shrink: true }}
          />
        </div>
      )}
    />
  );
};



// useEffect(() => {
//     const page = pageIndex + 1,
//       limit = pageSize;

//       let newQueryKey =`${url}?` 

//     if (search) {
//       // gotoPage(0)
//       // page = 0
//       newQueryKey += `page=${page}&limit=${limit}&search=${search}`
//     }else{
//       newQueryKey+= `page=${page}&limit=${limit}`
//     }

//     if(queryKey === newQueryKey){
//       return 
//     }

//     setQueryKey(newQueryKey);

//   }, [pageIndex, pageSize, search])