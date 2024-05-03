import {
  AccordionDetails,
  AccordionSummary,
  Accordion,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  TextField,
  Tooltip,
  Typography,
  Stack,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import ReactImageMagnify from "react-image-magnify";
import notFound from "../../assets/notImage.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetailsPage.css";
import axios from "axios";
import logosign from "../../assets/3d-sign.png";
import { toast } from "react-toastify";
// import ErrorIcon from "@mui/icons-material/Error";
// import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import PopupModal from "../PopupModal";

const Details = ({
  imageData,
  masterDetailed,
  pdStore,
  similarband,
  priceData,
  designList,
  setSearchValue,
}) => {
  const [localItem, setLocalItem] = useState([]);
  const [thumImg, setThumImg] = useState("");
  const [headStyle, setHeadStyle] = useState("");
  const [shapeStyle, setShapeStyle] = useState("");
  const [metaltypeSelect, setMetalTypeSelect] = useState("");
  const [ringSize, setRingSize] = useState("");
  const [ringColor, setRingColor] = useState("");
  const [ringct, setRingCt] = useState("");
  const [diamondP, setDiamondP] = useState("");
  const [bandImg, setBandImg] = useState("");
  const [bandPrice, setBandPrice] = useState("");
  const [open, setOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [search, setSearch] = useState();
  const [ringEngT, setRingEngT] = useState("");
  const [flag, setFlag] = useState(true);
  const [ringEngTF, setRingEngTF] = useState("Poppins");
  const [bandEngT] = useState("");
  const [bandEngTF] = useState("Poppins");
  const [searchObj, setSearchObj] = useState({});
  const [designNoP, setDesignNop] = useState();
  const [errorObj, setErrorObj] = useState({});
  const [fName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [note, setNote] = useState("");
  const [salesRep, setSalesRep] = useState("");
  const [flagRes, setFlagRes] = useState(false);
  const [spChecked, setSpChecked] = useState(false);
  const [bandDesign] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [setDesignListData] = useState("");
  const [dessignFlag, setDesignFlag] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const [flagLoader, setFlagLoader] = useState(false);
  const [flagLoad, setFlagLoad] = useState(false);
  const [SearchFlag, setSearchFlag] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  // const [desnoFlag,setDesnoFlag]=useState(false)
  const [errHead, setErrHead] = useState("");
  const [errShape, setErrShape] = useState("");
  const [errRingCt, setErrRingCt] = useState("");
  const [ringInfo, setRingInfo] = useState("");

  console.log("prev", { errHead, errShape }, { headStyle, shapeStyle });

  useEffect(() => {
    setDesignFlag(false);
  }, []);

  useEffect(() => {
    if (dessignFlag === true) {
      setTimeout(() => {
        setDesignFlag(false);
      }, 4000);
    }
  }, [dessignFlag]);

  useEffect(() => {
    setFlagLoader(true);

    setTimeout(() => {
      setFlagLoader(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!search && !searchVal) {
      setFlagLoader(false);
    }
  }, []);

  let locations = useLocation();

  let navigate = useNavigate();

  setTimeout(() => {
    setDesignListData("");
  }, 8000);

  // useEffect(()=>{
  //   let localData = JSON.parse(localStorage.getItem("selectedRingData"));
  //   // console.log("localData",localData);
  //   if(!locations.state &&  !localData?.length){
  //     let path=param["*"]
  //     searchValueData(path)
  //   }

  // },[param,locations])

  useEffect(() => {
    let localData = JSON.parse(localStorage.getItem("selectedRingData"));
    // console.log("localData::FromHomePage",localData);
    if (localData) {
      setLocalItem(localData);
    }
  }, []);

  const Similarbandonrefresh = useCallback(() => {
    if (similarband) {
      setBandImg(similarband[0]?.MediumImagePath);
      setBandPrice(similarband[0]?.amount);
    }
  }, [similarband]);

  useEffect(() => {
    Similarbandonrefresh();
  }, [Similarbandonrefresh]);

  useEffect(() => {
    if (flag && locations.state?.searchValue) {
      setSearch(locations.state?.searchValue);
    }
  }, [flag, locations.state?.searchValue]);

  const filterDiaColorQuality = () => {
    let datavalll = diamondP
      ? diamondP
      : localItem.diacolorQuality?.length
      ? localItem.diacolorQuality
      : localItem.diacolorqualityVal;

    let Arr1 = datavalll
      ?.split("@")[0]
      ?.slice(0, datavalll?.split("@")[0].length - 1);
    let Arr2 = datavalll?.split("@")[1]?.slice(1);

    return {
      X: Arr1 ?? "",
      Y: Arr2 ?? "",
    };
  };

  let PriceUpdateFunc = useMemo(() => {
    
    let designshapeno= (localItem.designno?.length > 7
      ? localItem.designno?.slice(0, 2)
      : localItem.designno?.charAt(0)) +
    (localItem.Shape) +
    (localItem.wt) +
    (localItem.head)

    
    let priceautocode = designList.filter(
      (arr1) => arr1.designno === designshapeno
      )[0]?.autocode;


    let priceautocode1 = designList.filter(
      (arr1) => arr1.designno === designshapeno
      );
      
      console.log("priceUpdateFuncmemo",priceautocode1);

    let priceUpdate = priceData?.filter(
      (arr1) =>
        arr1.A === (priceautocode ? priceautocode : localItem.autocode) &&
        (metaltypeSelect
          ? metaltypeSelect.split(" ")[1]
          : localItem.metalpurity) === arr1.D.split(" ")[1] &&
        arr1.B === filterDiaColorQuality().X &&
        arr1.C === filterDiaColorQuality().Y
    );

    console.log("priceData&&&&&&&&&&&&&&&&&&&&&&&&&&", priceUpdate[0]);

    let fp =
      priceUpdate[0]?.E === undefined
        ? 0
        : Math.ceil(priceUpdate[0]?.E * 2.2 - 10);
    return fp;
  }, [
    localItem,
    priceData,
    metaltypeSelect,
    designList,
    designNoP,
    filterDiaColorQuality,
  ]);

  console.log("local&&&&&&&&&&&&&&&&&&&&&&&&&&", filterDiaColorQuality().Y);

  // const ringColorCodeToName = useCallback(( ringCode ) =>{
  //   switch (ringCode) {
  //    case "RG":
  //      return "ROSE";

  //    case "PW":
  //      return "RPW";

  //    case "WG":
  //      return "WHITE";

  //    case "YG":
  //      return "YELLOW";

  //      default:
  //        return localItem.metalcolorname;
  //      }
  //    },[localItem])

  const designListDesc = () => {
     let designlistdesc=designList?.filter((desc) => desc.designno === designNoP)[0];
    //  if(designlistdesc){
    //   // let shapeWiseRangeData = designlistdesc.ShapeWiseRange.split("#")?.map((data)=>{return `${data?.split("@")[0]}-${data?.split("@")[1]}-${data?.split("@")[3]}`})
     
    //   // localStorage.setItem("ringDetails",JSON.stringify({approxMetalWeight:designlistdesc?.MetalWeight, sideDiawtpcs:`${designlistdesc?.sidestonewt}/${designlistdesc?.sidestonepcs}` }))
    //  }
     return designlistdesc
  };

  const designListShapeRange = () =>{
    let designlistdesc=designList?.filter((desc) => desc.designno === designNoP)[0];

    let shapeWiseRangeData;

     if(designlistdesc){
      shapeWiseRangeData = designlistdesc.ShapeWiseRange.split("#")?.map((data)=>{return `${data?.split("@")[0]}-${data?.split("@")[1]}-${data?.split("@")[3]}`})
      
      localStorage.setItem("ringDetails",JSON.stringify({approxMetalWeight:designlistdesc?.MetalWeight, sideDiawtpcs: shapeWiseRangeData}))
     }

     return shapeWiseRangeData

  }

  console.log("designListShapeRange",designListShapeRange())

  useEffect(()=>{
    let RingInfo = JSON.parse(localStorage.getItem("ringDetails"))
    setRingInfo(RingInfo)
  },[])



  console.log("designListDesc", designListDesc());

  let searchtext = useCallback(() => {
    let n = 16;
    if (searchVal.length === n) {
      return searchVal?.slice(0, n / 2);
    }
    if (searchVal.length === n - 1) {
      return searchVal?.slice(0, (n - 1) / 2);
    } else {
      return "";
    }
  }, [searchVal]);

  let findDesign = useCallback(() => {
    let findValue = designList.filter((y) => y.designno === searchtext());
    return findValue;
  }, [designList, searchtext]);

  const searchValueData = useCallback(() => {

    if (searchVal.length === 0 && SearchFlag) {
      toast.error("Not Valid Design No. !!!");
      setSearchVal("");
      // return
    }
    if (findDesign().length === 0 && SearchFlag) {
      toast.error("Build Number Is Not Found!!!");
      // return
    }
    // if (
    //   ((searchVal.length > 0 && (searchVal.length >= 16 || searchVal.length <= 14)))
    //   ) {
    //     setDesignListData("Not Valid Search !!!");
    //     setSearchVal("")
    //   // return;
    // }
    else {
      // let finalValue= (typeof(pathdata)==="string" && pathdata )? (pathdata) : (searchVal?searchVal:search)
      let finalValue = search ? search : searchVal;
      console.log("finalValue", finalValue);

      let dc =
        finalValue?.length === 16
          ? finalValue?.slice(0, 8)
          : finalValue?.slice(0, 7);
      let s =
        finalValue?.length === 16
          ? finalValue?.slice(2, 4)
          : finalValue?.slice(1, 3);
      let cw =
        finalValue?.length === 16
          ? finalValue?.slice(4, 7)
          : finalValue?.slice(3, 6);
      let h =
        finalValue?.length === 16
          ? finalValue?.slice(7, 8)
          : finalValue?.slice(6, 7);
      let mt =
        finalValue?.length === 16
          ? finalValue?.slice(8, 11)
          : finalValue?.slice(7, 10);
      let rc =
        finalValue?.length === 16
          ? finalValue?.slice(11, 13)
          : finalValue?.slice(10, 12);
      let rs =
        finalValue?.length === 16
          ? finalValue?.slice(13, 17)
          : finalValue?.slice(12, 16);

      setHeadStyle(h);
      setShapeStyle(s);
      setRingCt(cw);
      setMetalTypeSelect("GOLD" + " " + mt);
      setRingColor(rc);

      setSearchObj({
        dc,
        s,
        cw,
        h,
        mt,
        rc,
        rs,
      });

      if (localItem) {
        localItem["designno"] = dc;
        localItem["head"] = h;
        localItem["Shape"] = s;
        localItem["metalpurity"] = mt;
        localItem["ringsizecode"] = rs;
        localItem["metalcolorname"] = rc;
        localItem["wt"] = cw;
        localItem["price"] = PriceUpdateFunc;
        localItem["image"] = thumImg;
        localItem["diacolorQuality"] = diamondP;

        Cookies.set("selectedRingData", JSON.stringify(localItem));
        localStorage.setItem("selectedRingData", JSON.stringify(localItem));
      }

      toast.success("Item found SuccessFully.");
      setSearchVal("");
      setSearchObj({});
      setSearch();
    }
    setSearchFlag(false);
  }, [searchVal, localItem, PriceUpdateFunc, thumImg, search]);


  const handelkeypress = (event) =>{
    if (event.key === 'Enter' && searchVal.length >0 && searchVal.length) {
      searchValueData();
    }
    // else{
    //   toast.error("Enter a valid Build Number.")
    // }
  }

  useEffect(() => {
    if (search && locations.state?.searchValue) {
      searchValueData();
    }
  }, [search, locations.state?.searchValue, searchValueData, findDesign]);

  // useEffect(()=>{
  //   if(search && window.location.pathname.length){
  //     searchValueData()
  //   }
  // },[search,searchValueData])

  // let priceUpdate = priceData?.filter(
  //   (arr1) =>
  //     arr1.A === localItem.autocode &&
  //     localItem.metalpurity === arr1.D.split(" ")[1] &&
  //     arr1.B === "VVS" &&
  //     arr1.C === "UnGraded"
  // );

  console.log("ringColor++++", ringColor);

  // const ringColorCode = useMemo(() =>{

  //    switch (ringColor) {
  //     case "ROSE":
  //       return "RG";

  //     case "RPW":
  //       return "PW";

  //     case "WHITE":
  //       return "WG";

  //     case "YELLOW":
  //       return "YG";

  //     default:
  //       return localItem.metalcolorcode;
  //     }
  //     },[ringColor,localItem])

  const designNumber = useMemo(() => {
    const designno =
      (localItem.designno?.length > 7
        ? localItem.designno?.slice(0, 2)
        : localItem.designno?.charAt(0)) +
      (localItem.Shape) +
      (localItem.wt) +
      (localItem.head);
      
        let designshapeno= (localItem.designno?.length > 7
          ? localItem.designno?.slice(0, 2)
          : localItem.designno?.charAt(0)) +
        (localItem.shape) +
        (localItem.wt) +
        (localItem.head)
    
    let designData = designList?.filter(
      (arr1) => arr1.designno === designshapeno
    );

    console.log("desssssss",designData)

    if (localItem && designno) {
      localItem["designno"] = searchObj.dc?.length ? searchObj.dc : designno;
      Cookies.set("selectedRingData", JSON.stringify(localItem));
      localStorage.setItem("selectedRingData", JSON.stringify(localItem));
    }
    if (localItem && PriceUpdateFunc) {
      localItem["price"] = PriceUpdateFunc;
      Cookies.set("selectedRingData", JSON.stringify(localItem));
      localStorage.setItem("selectedRingData", JSON.stringify(localItem));
    }
    setDesignNop(searchObj.dc?.length ? searchObj.dc : designno);
    return searchObj.dc?.length ? searchObj.dc : designno;
  }, [headStyle, shapeStyle, localItem, ringct, searchObj, PriceUpdateFunc]);

  const ringcolorVal = useMemo(() => {
    let ringcolorvalue = ringColor ? ringColor : localItem.metalcolorname;
    return searchObj.rc?.length ? searchObj.rc : ringcolorvalue;
  }, [localItem, ringColor, searchObj]);

  const metaltype = useMemo(() => {
    let metalTypeNumber = metaltypeSelect?.length
      ? metaltypeSelect.split(" ")[1]
      : localItem.metalpurity;
    return searchObj.mt?.length ? searchObj.mt : metalTypeNumber;
  }, [metaltypeSelect, localItem, searchObj]);

  const ringSizeCode = useMemo(() => {
    let ringSizeCode = ringSize
      ? ringSize
      : localItem.ringsizecode
      ? localItem.ringsizecode
      : "400";
    return searchObj.rs?.length ? searchObj.rs : ringSizeCode;
  }, [localItem, ringSize, searchObj]);

  console.log("ringcolorVal", ringcolorVal);

  // useEffect(()=>{
  //   // window.history.pushState(null,'',`/details/${designNumber}${metaltype}${ringColorCode}${ringSizeCode}`)
  //   window.history.pushState(null,'',`/details/${designNumber}${metaltype}${ringcolorVal}${ringSizeCode}`)
  // },[localItem,headStyle,shapeStyle,thumImg,metaltype,ringSize,ringcolorVal,ringct,designNumber,ringSizeCode])

  const prevState = useCallback(() => {
    return (
      (localItem.designno?.length > 7
        ? localItem.designno?.slice(0, 2)
        : localItem.designno?.charAt(0)) +
      (shapeStyle ? shapeStyle : localItem.Shape) +
      (ringct ? ringct : localItem.wt) +
      (headStyle ? headStyle : localItem.head)
    );
  }, [designNumber, errShape, errRingCt, errHead, localItem]);

  const DesignListEng = useCallback(() => {
    console.log("designNumber1111", designNumber);
    let designData = designList?.filter(
      (arr1) => arr1.designno === prevState()
    );

    return designData;
  }, [designNumber, designList, prevState]);


  const EngravePrice = useCallback(()=>{

    let designshapeno= (localItem.designno?.length > 7
      ? localItem.designno?.slice(0, 2)
      : localItem.designno?.charAt(0)) +
    (localItem.Shape) +
    (localItem.wt) +
    (localItem.head)

    let designData = designList?.filter(
      (arr1) => arr1.designno === designshapeno
    );

    return designData;

  },[localItem,designList])

  console.log("EngravePrice", EngravePrice()[0]?.Engraving);
  localStorage.setItem("mynewOne", DesignListEng().length);

  //   useEffect(()=>{
  //     if(!(DesignListEng()[0]?.designno === designNumber && dessignFlag)){
  //       toast.error("123456789")
  //  }
  //   },[DesignListEng,designNumber,dessignFlag])

  const buildNumber = useCallback(() => {
    // return designNumber+metaltype+ringColorCode+ringSizeCode
    return designNumber + metaltype + ringcolorVal + ringSizeCode;
  }, [designNumber, metaltype, ringSizeCode, ringcolorVal]);

  console.log("buildNumber", designNumber);

  const filterOutImage = useCallback(() => {
    const imageFilter = imageData?.filter(
      (arr1) =>
        // arr1.autocode === localItem.autocode &&
        arr1.designno === designNumber && arr1.colorname === ringcolorVal
    );

    return imageFilter;
  }, [imageData, designNumber, ringcolorVal]);

  useEffect(() => {
    setThumImg(filterOutImage()[0]?.imagepath);
  }, [headStyle, filterOutImage]);

  // console.log("img",filterOutImage() );

  const reactMagnifyImageMemo = useCallback(() => {
    const imageData = filterOutImage()[
      imageIndex ? imageIndex : localItem.index
    ]?.imagepath
      ? filterOutImage()[imageIndex ? imageIndex : localItem.index]?.imagepath
      : thumImg
      ? thumImg
      : "";

    return imageData;
  }, [thumImg, filterOutImage, localItem?.index]);

  console.log("reactMagnifyImageMemo", localItem.index);

  const reactImageMagnify = useCallback(
    () => (
      <>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "magnify img",
              src: reactMagnifyImageMemo()?.length
                ? pdStore?.imagepath + reactMagnifyImageMemo()
                : notFound,
              width:
                window.innerWidth < 1828
                  ? window.innerWidth < 1407
                    ? 450
                    : 550
                  : 750,
              height:
                window.innerWidth < 1828
                  ? window.innerWidth < 1407
                    ? 450
                    : 550
                  : 750,
            },
            largeImage: {
              src: reactMagnifyImageMemo()?.length
                ? pdStore?.imagepath + reactMagnifyImageMemo()
                : notFound,
              width: 1300,
              height: 1300,
            },
            isHintEnabled: true,
            shouldHideHintAfterFirstActivation: true,
            enlargedImageContainerDimensions: {
              width: "85%",
              height: "85%",
            },
            enlargedImageContainerStyle: {
              marginLeft: window.innerWidth < 884 ? "0px" : "30px",
            },
            enlargedImagePosition: window.innerWidth < 884 ? "over" : "beside",
          }}
          // className='mainclass'
          // imageClassName='smallmegnifyImg'
          // enlargedImageClassName='enlargemegnifyImg'
          // enlargedImageContainerClassName='imgcontainer'
        />
      </>
    ),
    [reactMagnifyImageMemo, pdStore]
  );

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
  };
  const validatephone = (phoneno) => {
    return /^[0-9]\d{9}$/.test(phoneno);
  };



  const handelRingSize = (rscode) =>(
    masterDetailed.pdstore5?.filter((rsize) =>
      rscode === rsize.ringsizecode ? rsize.ringsize : ""
    ));

  // console.log("handelRingSize",handelRingSize("425"));

  const handelSubmit = useCallback(async () => {
    if (!validatephone(phone)) {
      setErrorObj({ label: "phone-valid", err: "phone is not valid!!!!" });
    }

    if (phone?.length === 0) {
      setErrorObj({ label: "phone", err: "phone number  is required!!!!" });
    }

    if (!validateEmail(email)) {
      setErrorObj({ label: "email-valid", err: "email is not valid!!!!" });
    }

    if (email?.length === 0) {
      setErrorObj({ label: "email", err: "email  is required!!!!" });
    }

    if (LName?.length === 0) {
      setErrorObj({ label: "lname", err: "last name is required!!!!" });
    }

    if (fName?.length === 0) {
      setErrorObj({ label: "fname", err: "first name is required!!!!" });
    }

    if (
      !validatephone(phone) ||
      phone?.length === 0 ||
      !validateEmail(email) ||
      email?.length === 0 ||
      LName?.length === 0 ||
      fName?.length === 0
    ) {
      console.log("error");
    } else {
      setFormLoader(true);
      let newPayload = {
        FrontEnd_RegNo: pdStore?.FrontEnd_RegNo,
        autocode: DesignListEng()[0]?.autocode,
        designno: buildNumber(),
        metaltype: "GOLD",
        metalpurity: metaltype,
        metalcolor: ringcolorVal,
        unitprice: `${PriceUpdateFunc}`,
        matchingband: bandDesign ? bandDesign : "",
        size: ringSizeCode ? handelRingSize(ringSizeCode)[0]?.ringsize : "4",
        firstname: fName,
        lastname: LName,
        emailid: email,
        salesrep: salesRep,
        mobileno: phone,
        zip: zip,
        note: note,
        issalesrep_contactme: spChecked === true ? "1" : "0",
        design_engrave_msg: ringEngT,
        design_engrave_price: ringEngT ? DesignListEng()[0]?.Engraving : "0",
        matchingband_engrave_msg: bandEngT,
        matchingband_engrave_price: bandEngT ? "25" : "0",
        design_fontscript: ringEngT.length ? ringEngTF : "-",
        matchingband_fontscript: bandEngTF,
        head: headStyle ? headStyle : localItem.head,
        shape: shapeStyle ? shapeStyle : localItem.Shape,
        diamond: `${filterDiaColorQuality().X}-${filterDiaColorQuality().Y}`,
        weight: designNumber.slice(
          designNumber.length - 4,
          designNumber.length - 1
        ),
        matchingband_price: "",
        imagepath: `${
          reactMagnifyImageMemo()?.length
            ? pdStore?.imagepath + reactMagnifyImageMemo()
            : notFound
        }`,
        matchingband_imagepath: "",
        currency_symbol: "$",
        metalapproximatewt: designListDesc()?.MetalWeight ?? "",
        sidediamondwt: designListDesc()?.sidestonewt ?? "",
        sidediamondpcs: designListDesc()?.sidestonepcs ?? "",
      };

      // console.log("payload", btoa(JSON.stringify(newPayload)));
      console.log("payload", newPayload);

      let newData = JSON.stringify(newPayload);
      let bin64 = btoa(newData);
      let data = {
        con: '{"id":"","mode":"pdsaveorder","appuserid":""}',
        p: `${bin64}`,
        // f: "formname (pdsaveorder)",
        f: "(pdsaveorder)",
      };

      let config = {
        method: "post",
        url: "https://api.optigoapps.com/V18/M.asmx/Ctrl",
        headers: {
          Authorization: "",
          YearCode:
            "e3tsaXZlLm9wdGlnb2FwcHMuY29tfX17ezIwfX17e3JpbmdidWlsZG19fXt7cmluZ2J1aWxkbX19",
          version: "V1",
          "Content-Type": "application/json",
          // Cookie: "ASP.NET_SessionId=qngjznqvi5rkxihydxu030hy",
        },
        data: data,
      };

      await axios
        .request(config)
        .then((response) => {
          if (response.status === 200) {
            setFlagRes(true);
            setFormLoader(false);
          } else {
            setFlagRes(false);
          }
        })
        .catch((error) => {
          setFlagRes(false);
          console.log(error);
        });
    }
  }, [
    LName,
    fName,
    email,
    phone,
    DesignListEng,
    PriceUpdateFunc,
    bandEngT,
    bandEngTF,
    bandPrice,
    headStyle,
    metaltype,
    note,
    pdStore,
    ringEngT,
    ringEngTF,
    ringcolorVal,
    salesRep,
    shapeStyle,
    spChecked,
    zip,
    bandDesign,
    localItem,
    ringSizeCode,
    buildNumber,
  ]);

  const modal3d = useCallback(() => {
    return (
      <div className="outer-modal3d">
        <div className="inner-modal3d">
          <iframe
            title="Embedded Content"
            src={`https://view3d.optigoapps.com/?a=${designNumber}&b=${ringColor}`}
            className="w-100 popupModal3D"
            height="100%"
            width="100%"
            style={{ border: "none" }}
          ></iframe>
        </div>
      </div>
    );
  }, [popupOpen, designNumber, ringColor]);

  useEffect(() => {
    if (reactMagnifyImageMemo().length === 0) {
      setFlagLoad(true);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFlagLoad(false);
    }, 1000);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   if (dessignFlag && DesignListEng()[0]?.autocode === undefined) {
  //     toast.error("Design Number Not found!!!");
  //   }
  // }, [DesignListEng, dessignFlag, prevState]);

  // console.log("prevState",prevState(),DesignListEng(),DesignListEng()[0]?.autocode === undefined);
  console.log(
    "prevcon",
    (DesignListEng()[0]?.autocode === undefined)
  );

  const handleShapeStyle = useCallback((shape) => {
    setShapeStyle(shape);
    setDesignFlag(true);
    setFlag(false);
    setErrShape(shape);

    // (DesignListEng()[0]?.autocode !== undefined) && setShapeStyle(shape.shapecode);

    let designshapeno= (localItem.designno?.length > 7
      ? localItem.designno?.slice(0, 2)
      : localItem.designno?.charAt(0)) +
    (shape) +
    (errRingCt ? errRingCt : localItem.wt) +
    (errHead ? errHead : localItem.head)

    let designData = designList?.filter(
      (arr1) => arr1.designno === designshapeno
    );

    console.log("oooooooooooooooooo", designData.length);

    designData.length !== 0 && setShapeStyle(shape);
    // if (localItem && (DesignListEng()[0]?.autocode !== undefined)) {
    if (localItem && designData.length !== 0) {
      localItem["Shape"] = shape;
      Cookies.set("selectedRingData", JSON.stringify(localItem));
      localStorage.setItem("selectedRingData", JSON.stringify(localItem));
    }else{
      toast.error("Design Number Not found!!!");
    }
  }, [localItem,errRingCt,errHead,designList]);

  const handelheadstyle = useCallback((head) => {
    setDesignFlag(true);
    setFlag(false);
    setErrHead(head);
    // (DesignListEng()[0]?.autocode !== undefined) && setHeadStyle(head.headcode);

    let designshapeno= (localItem.designno?.length > 7
      ? localItem.designno?.slice(0, 2)
      : localItem.designno?.charAt(0)) +
    (localItem.Shape) +
    (errRingCt ? errRingCt : localItem.wt) +
    (head)

    let designData = designList?.filter(
      (arr1) => arr1.designno === designshapeno
    );

    console.log("click",designshapeno);
    designData.length !== 0 && setHeadStyle(head);

    // if (localItem && (DesignListEng()[0]?.autocode !== undefined)) {
    if (localItem && designData.length !== 0) {
      localItem["head"] = head;
      Cookies.set("selectedRingData", JSON.stringify(localItem));
      localStorage.setItem("selectedRingData", JSON.stringify(localItem));
    }else{
      toast.error("Design Number Not found!!!");
    }
  }, [localItem,errRingCt,errShape,designList]);


  const handelCenterWeight=useCallback((e)=>{
    setDesignFlag(true);
    setFlag(false);
    setErrRingCt(e.target.value);

    let designshapeno= (localItem.designno?.length > 7
      ? localItem.designno?.slice(0, 2)
      : localItem.designno?.charAt(0)) +
    (localItem.Shape) +
    (e.target.value) +
    (localItem.head)

    let designData = designList?.filter(
      (arr1) => arr1.designno === designshapeno
    );

    console.log("handelCenterWeightclick",designshapeno);
    designData.length !== 0 && setRingCt(e.target.value);
    // setDesnoFlag( dessignFlag && DesignListEng()[0]?.autocode === undefined)
    if (localItem && designData.length !== 0) {
      localItem["wt"] = e.target.value;
      Cookies.set(
        "selectedRingData",
        JSON.stringify(localItem)
      );
      localStorage.setItem(
        "selectedRingData",
        JSON.stringify(localItem)
      );
    }else{
      toast.error("Design Number Not found!!!");
    }
  },[localItem,designList])

  useEffect(()=>{
    localItem["index"] = 1
  },[])


  return (
    <>
      {(flagLoader || flagLoad) && (
        <Box
          sx={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            opacity: 0.5,
            zIndex: (flagLoader || flagLoad) === true ? 1 : -1,
          }}
        >
          <CircularProgress sx={{ color: "black" }} size={50} />
        </Box>
      )}
      {!flagLoader && (
        <Box style={{ zIndex: (flagLoader || flagLoad) === false ? 1 : -1 }}>
          <Box
            component={"div"}
            className="header_search_section"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "20px 60px",
              flexWrap: "wrap",
              gap: "22px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                zIndex: 1,
                justifyContent: "center",
              }}
            >
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "200px",
                  // transition: '1s',
                  transform:'translateY(42px)',transition:"all 0.3s",
                  position:'fixed',
                  top:'0px',
                }}
                className={
                  dessignFlag &&
                  DesignListEng()[0]?.autocode === undefined &&
                  "pop-up-error"
                }
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "red",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  {dessignFlag &&
                    DesignListEng()[0]?.autocode === undefined && (
                      <ErrorIcon sx={{ color: "red" }} />
                    )}
                  {dessignFlag &&
                    (DesignListEng()[0]?.autocode === undefined
                      ? "Not Found!!!"
                      : dessignListData)}
                  {dessignFlag &&
                    DesignListEng()[0]?.autocode === undefined && (
                      <CloseRoundedIcon
                        sx={{
                          color: "#6a6a6a",
                          marginLeft: "19px",
                          border: "1px solid #e1e1e1",
                          borderRadius: "50%",
                          cursor:'pointer'
                        }}
                        onClick={()=>setDesignFlag(false)}
                      />
                    )}
                </Typography>
              </div> */}
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // marginRight: '200px',
                  transform: "translateY(42px)",
                  transition: "all 0.3s",
                  position: "fixed",
                  top: "0px",
                  backgroundColor:
                    dessignFlag &&
                    (DesignListEng()[0]?.autocode === undefined || DesignListEng().length===0) &&
                    "#f44336",
                  boxShadow:
                    dessignFlag &&
                    DesignListEng()[0]?.autocode === undefined &&
                    "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  borderRadius: "8px",
                  // boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                }}
                // className={dessignFlag && DesignListEng()[0]?.autocode === undefined && 'pop-up-error'}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#fff",
                    borderRadius: "5px",
                    padding:
                      dessignFlag &&
                      DesignListEng()[0]?.autocode === undefined &&
                      "15px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "20px",
                    transition: "all 0.3s",
                  }}
                >
                  {dessignFlag &&
                    DesignListEng()[0]?.autocode === undefined && (
                      <ErrorIcon sx={{ fontSize: "20px" }} />
                    )}
                  <span>
                    {dessignFlag &&
                      (DesignListEng()[0]?.autocode === undefined
                        ? `${buildNumber()} Design Not Available !!!`
                        : dessignListData)}
                  </span>
                  {dessignFlag &&
                    DesignListEng()[0]?.autocode === undefined && (
                      <CloseRoundedIcon
                        sx={{
                          color: "#fff",
                          fontSize: "16px",
                          cursor: "pointer",
                          marginLeft: "auto",
                          marginTop: "-25px",
                          marginRight: "-15px",
                        }}
                        onClick={() => setDesignFlag(false)}
                      />
                    )}
                </Typography>
              </div> */}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/");
                setSearchValue("");
                setFlag(false);
              }}
            >
              <Typography
                className="choose-style"
                fontWeight={"bold"}
                sx={{ fontFamily: "Roboto" }}
              >
                CHOOSE ANOTHER STYLE
              </Typography>
            </div>
            <Tooltip
              title={
                searchVal.length === 0 ? "Enter Some Value for search" : ""
              }
              placement="top-end"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  cursor: "pointer",
                }}
              >
                <input
                  style={{
                    border: "2px solid black",
                    outline: "none",
                    height: "35px",
                    width: "295px",
                    borderRadius: "8px",
                    fontSize: "18px",
                    paddingRight: "7px",
                    paddingLeft: "15px",
                  }}
                  placeholder="search build number"
                  value={searchVal}
                  onChange={(e) => {
                    setSearchVal(e.target.value);
                    setFlag(false);
                    setSearchFlag(true);
                  }}
                  onKeyDown={handelkeypress}
                />
                <Button
                  variant="contained"
                  style={{
                    height: "40px",
                    backgroundColor: "#3C7FDA",
                    color: "white",
                  }}
                  onClick={searchValueData}
                  disabled={searchVal.length === 0 ? true : false}
                >
                  <Typography
                    sx={{ fontWeight: "500", textTransform: "capitalize" }}
                  >
                    Search
                  </Typography>
                </Button>
              </div>
            </Tooltip>
          </Box>
          <Box component={"div"} className="item_detail_section">
            {/* first part ring image */}
            <Box component={"div"} className="ring_images">
              <Box
                component={"div"}
                className="thumbImgDiv"
                style={{ cursor: "pointer" }}
              >
                {filterOutImage().map((data, index) => {
                  return (
                    <>
                      <img
                        key={index}
                        src={pdStore?.imagepath + data.imagepath}
                        style={{
                          filter: (
                            (imageIndex ?? localItem.index) ===
                              (null || undefined) ||
                            !(filterOutImage().length >= localItem.index + 1)
                              ? index === 0
                              : (imageIndex ?? localItem.index) === index &&
                                !popupOpen
                          )
                            ? "brightness(0.5)"
                            : "",
                          // filter:
                          //   ((thumImg ? thumImg : localItem.image) !==
                          //     data.imagepath || popupOpen)
                          //     ?""
                          //     :"brightness(0.5)",
                          transition: "500ms ease-in-out",
                        }}
                        className="ring_image"
                        alt="ring_image"
                        onClick={() => {
                          console.log("iiiiii", index);
                          setPopupOpen(false);
                          setFlag(false);
                          setImageIndex(index);
                          setThumImg(data.imagepath);
                          if (localItem) {
                            localItem["index"] = index;
                            localItem["image"] = data.imagepath
                              ? data.imagepath
                              : notFound;
                            Cookies.set(
                              "selectedRingData",
                              JSON.stringify(localItem)
                            );
                            localStorage.setItem(
                              "selectedRingData",
                              JSON.stringify(localItem)
                            );
                          }
                        }}
                      />
                    </>
                  );
                })}
                {filterOutImage().length > 0 && (
                  <Box component={"div"} onClick={() => setPopupOpen(true)}>
                    <img
                      style={{
                        objectFit: "cover",
                        width: "65px",
                        height: "65px",
                        // border:'1px solid black',
                        backgroundColor: "#e2e2e2",
                        borderRadius: "8px",
                        position: "relative",
                        padding: "5px",
                        filter: !popupOpen ? "" : "brightness(0.5)",
                      }}
                      alt={''}
                      src={logosign}
                    />
                  </Box>
                )}
              </Box>

              <Box
                component={"div"}
                style={{
                  height: "auto",
                  margin: "10px 0px 0px 12px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {!popupOpen ? reactImageMagnify() : modal3d()}
                <Box
                  component={"div"}
                  style={{
                    display: "flex",
                    // justifyContent: "center",
                    // alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      marginTop: "12px",
                      width:
                        window.innerWidth < 1828
                          ? window.innerWidth < 1407
                            ? 450
                            : 550
                          : 750,
                      display: "felx",
                      justifyContent: "center",
                    }}
                  >
                    <font
                      style={{
                        fontSize: "16px",
                        color: "gray",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {designListDesc()?.description}
                      {/* Here's a beautiful piece of jewelry weighing 12.12 grams in
                  total, with 10.00 grams as the net weight. It's adorned with
                  sparkling 5.00 carat diamonds and detailed enameling for an
                  extra touch of charm. */}
                    </font>
                  </div>
                  <div className="buildnumber" style={{ fontFamily: "Roboto" }}>
                    <font style={{ fontWeight: "400", fontFamily: "Roboto" }}>
                      {"Build Number"}
                    </font>
                    :{buildNumber()}
                  </div>
                </Box>
              </Box>
              <Box
                component={"div"}
                className="ring_info_sec"
                sx={{
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  width: "100%",
                  marginLeft: "158px",
                  height:'100%',
                  marginTop:'40px'
                }}
              >
                <Accordion
                  elevation={0}
                  sx={{
                    border: "1px solid #f1f1f1",
                    width: "80%",
                  }}
                  defaultExpanded={true}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{
                      borderBottom: "1px solid #f1f1f1",
                      "& .MuiAccordionSummary-content.Mui-expanded": {
                        margin: 0,
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "17px",
                        fontFamily: "Roboto",
                        color: "#808080",
                      }}
                    >
                      Ring Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* <Typography sx={{textTransform:'capitalize',marginTop:'-10px',fontSize:'15px',textTransform:'uppercase'}}>
                      Ring Information
                      </Typography> */}
                    {/* <Divider/> */}
                    <Stack
                      sx={{ marginTop: "12px", color: "#808080" }}
                      spacing={1}
                    >
                      {/* <Typography
                        sx={{
                          fontFamily: "Roboto",
                          textTransform: "capitalize",
                          fontSize: "14px",
                        }}
                      >
                        {" "}
                        approx. metal weight :&nbsp;
                        <span
                          style={{ fontWeight: "bold", letterSpacing: "1px" }}
                        >
                          {(designListDesc()?.MetalWeight
                            ? designListDesc()?.MetalWeight
                            : ringInfo?.approxMetalWeight) ?? ""}
                        </span>
                      </Typography> */}
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          textTransform: "capitalize",
                          fontSize: "14px",
                          display:'flex',
                          gap:'2px'
                        }}
                      >
                        side dia. weight/pcs <span style={{marginLeft:'4px',marginRight:'4px'}}>:</span> 
                        <span
                          style={{ fontWeight: "bold", letterSpacing: "1px" ,display:'flex',flexDirection:'column',gap:'5px'}}
                        >
                          {/* {(designListDesc()?.sidestonewt &&
                          designListDesc()?.sidestonepcs
                            ? `${designListDesc()?.ShapeWiseRange.split("@")[0]}-${designListDesc()?.ShapeWiseRange.split("@")[1]}-${designListDesc()?.ShapeWiseRange.split("@")[3]}`
                            : ringInfo?.sideDiawtpcs) ?? ""} */}
                          {/* {
                            (designListDesc()?.ShapeWiseRange.length ? designListDesc()?.ShapeWiseRange : ringInfo?.sideDiawtpcs))
                          } */}

                          {designListShapeRange()?.map((data)=>(
                              <span>{data}</span>
                          ))}
                        </span>
                      </Typography>
                      {/* <Typography sx={{fontFamily: "Roboto",textTransform:'capitalize'}}>sidediamondpcs:&nbsp;<span>{ designListDesc()?.sidestonepcs ?? ""}</span></Typography> */}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Box>

            {/*second part ( "RING" section part) */}

            <Box component={"div"} className="ring_customize_options">
              {/* <Box
                component={"div"}
                style={{ width: "90%", marginTop: "12px" }}
              >
                <Divider sx={{ background: "#c8c8c8" }} />
                <h1
                  style={{
                    margin: "2px",
                    marginLeft: "20px",
                    color: "black",
                    fontFamily: "Roboto",
                  }}
                >
                  {designListDesc()?.TitleLine ?? "EVA"}
                </h1>
                <Divider sx={{ background: "#c8c8c8" }} />
              </Box> */}
              <Box component={"div"} style={{ marginTop: "15px" }}>
                <table border="0" cellspacing="0" cellpadding="0" width="100%">
                  <tbody>
                    <tr height="40">
                      <td
                        width="40%"
                        style={{
                          background:
                            "linear-gradient(to right, white, rgba(230,239,246))",
                        }}
                      >
                        &nbsp;
                      </td>
                      <td
                        align="center"
                        style={{
                          background: "rgba(230,239,246)",
                        }}
                      >
                        <font style={{ fontSize: "30px", color: "black" }}>
                          {designListDesc()?.TitleLine}
                        </font>
                      </td>
                      <td
                        width="40%"
                        style={{
                          background:
                            "linear-gradient(to left, white, rgba(230,239,246))",
                        }}
                      >
                        &nbsp;
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
              <Box component={"div"} style={{ display: "flex", width: "100%" }}>
                <Box
                  component={"div"}
                  style={{
                    width: "15%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span> CHOOSE YOUR HEAD STYLE </span>
                </Box>
                <Box
                  component={"div"}
                  style={{
                    width: "85%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "30px",
                  }}
                >
                  {masterDetailed.pdstore1?.map((head) => {
                    //  console.log("searchHeadOBJ========",(head.indexOf(searchObj.h?.length ? (searchObj.h):(headStyle ? headStyle : localItem.head))))
                    return (
                      <Box
                        component={"div"}
                        style={{
                          border:
                            localItem.head === head.headcode
                              ? "1px solid #c8c8c8"
                              : "",
                          borderRadius: "12px",
                          margin: "12px",
                        }}
                        onClick={() => handelheadstyle(head.headcode)}
                      >
                        <Box
                          component={"img"}
                          src={head.headimagepath}
                          style={{ width: "145px", borderRadius: "12px" }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
              <Box component={"div"} style={{ display: "flex", width: "100%" }}>
                <Box
                  component={"div"}
                  style={{
                    width: "15%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span> CHOOSE YOUR CENTER SHAPE </span>
                </Box>
                <Box
                  component={"div"}
                  style={{
                    width: "85%",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "30px",
                  }}
                >
                  {masterDetailed.pdstore2?.map((shape) => (
                    <Box
                      component={"div"}
                      style={{
                        border:
                          // searchObj.s?.length
                          //   ? searchObj.s
                          //   : (shapeStyle ? shapeStyle : localItem.Shape) ===
                          //     shape.shapecode
                          localItem.Shape === shape.shapecode
                            ? "1px solid #c8c8c8"
                            : "",
                        borderRadius: "12px",
                        padding: "12px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => handleShapeStyle(shape.shapecode)}
                    >
                      <Box
                        component={"img"}
                        src={shape.shapeimage}
                        style={{ width: "80px", borderRadius: "12px" }}
                      />
                      <Typography>{shape.shapename}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box
                component={"div"}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "30px",
                  marginTop: "60px",
                }}
              >
                <Box
                  component={"div"}
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "90%",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    component={"div"}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      width: "40%",
                    }}
                  >
                    <label>METAL TYPE</label>
                    <select
                      style={{ height: "40px" }}
                      value={
                        searchObj.mt?.length
                          ? searchObj.mt
                          : metaltypeSelect
                          ? metaltypeSelect
                          : `GOLD ${localItem.metalpurity}`
                      }
                      onChange={(e) => {
                        setFlag(false);
                        setMetalTypeSelect(e.target.value);
                        if (localItem) {
                          localItem["metalpurity"] =
                            e.target.value?.split(" ")[1];
                          Cookies.set(
                            "selectedRingData",
                            JSON.stringify(localItem)
                          );
                          localStorage.setItem(
                            "selectedRingData",
                            JSON.stringify(localItem)
                          );
                        }
                      }}
                    >
                      {masterDetailed.pdstore3?.map((mtype) => {
                        return (
                          <option
                            key={mtype.metalPurity}
                            value={mtype.Metaltype}
                          >
                            {mtype.Metaltype}
                          </option>
                        );
                      })}
                    </select>
                  </Box>

                  <Box
                    component={"div"}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      width: "40%",
                    }}
                  >
                    <label>RING SIZE</label>
                    <select
                      style={{ height: "40px" }}
                      value={
                        searchObj.rs?.length
                          ? searchObj.rs
                          : ringSize
                          ? ringSize
                          : localItem.ringsizecode
                          ? localItem.ringsizecode
                          : "4"
                      }
                      onChange={(e) => {
                        setFlag(false);
                        setRingSize(e.target.value);
                        if (localItem) {
                          localItem["ringsizecode"] = e.target.value;
                          Cookies.set(
                            "selectedRingData",
                            JSON.stringify(localItem)
                          );
                          localStorage.setItem(
                            "selectedRingData",
                            JSON.stringify(localItem)
                          );
                        }
                      }}
                    >
                      {masterDetailed.pdstore5?.map((size) => {
                        return (
                          <option
                            key={size.ringsizecode}
                            value={size.ringsizecode}
                          >
                            {size.ringsize}
                          </option>
                        );
                      })}
                    </select>
                  </Box>
                </Box>

                <Box
                  component={"div"}
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "90%",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    component={"div"}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      width: "40%",
                    }}
                  >
                    <label>METAL COLOR</label>
                    <select
                      style={{ height: "40px" }}
                      value={
                        searchObj.rc?.length
                          ? searchObj.rc
                          : ringColor
                          ? ringColor
                          : localItem.metalcolorname
                      }
                      onChange={(e) => {
                        setFlag(false);
                        setRingColor(e.target.value);
                        if (localItem) {
                          localItem["metalcolorname"] = e.target.value;
                          localItem["metalcolorcode"] =
                            e.target.value === "RPW"
                              ? "PW"
                              : e.target.value.charAt(0) + "G";

                          Cookies.set(
                            "selectedRingData",
                            JSON.stringify(localItem)
                          );
                          localStorage.setItem(
                            "selectedRingData",
                            JSON.stringify(localItem)
                          );
                        }
                      }}
                    >
                      {masterDetailed.pdstore4?.map((color) => {
                        return (
                          <option
                            key={color.metalcolorcode}
                            value={color.metalcolorname}
                          >
                            {color.metalcolorname}
                          </option>
                        );
                      })}
                    </select>
                  </Box>

                  <Box
                    component={"div"}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      width: "40%",
                    }}
                  >
                    <label>CENTER CARAT WEIGHT</label>
                    <select
                      style={{ height: "40px" }}
                      value={
                        searchObj.cw?.length
                          ? searchObj.cw
                          : ringct
                          ? ringct
                          : localItem.wt
                      }
                      onChange={handelCenterWeight}
                    >
                      {masterDetailed.pdstore6?.map((ct) => {
                        return (
                          <option key={ct.weightcode} value={ct.weightcode}>
                            {ct.weight}
                          </option>
                        );
                      })}
                    </select>
                  </Box>
                </Box>

                <Box style={{ width: "81%" }}>
                  <Box
                    component={"div"}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "45%",
                      marginLeft: "0px",
                    }}
                  >
                    <label>DIAMOND</label>
                    <select
                      style={{ height: "40px" }}
                      value={
                        diamondP
                          ? diamondP
                          : localItem.diacolorQuality?.length
                          ? localItem.diacolorQuality
                          : localItem.diacolorqualityVal
                      }
                      onChange={(e) => {
                        setDesignFlag(true);
                        setFlag(false);
                        setDiamondP(e.target.value);
                        if (localItem) {
                          localItem["diacolorQuality"] = e.target.value;
                          Cookies.set(
                            "selectedRingData",
                            JSON.stringify(localItem)
                          );
                          localStorage.setItem(
                            "selectedRingData",
                            JSON.stringify(localItem)
                          );
                        }
                      }}
                    >
                      {masterDetailed.pdstore7?.map((ct) => {
                        return (
                          <option
                            key={ct.diacolorquality}
                            value={ct.diacolorqualityVal}
                          >
                            {ct.diacolorqualityText}
                          </option>
                        );
                      })}
                    </select>
                  </Box>
                </Box>
              </Box>
              <Box
                component={"div"}
                style={{
                  display: "flex",
                  width: "90%",
                  flexDirection: "column",
                  marginTop: "30px",
                  marginBottom: "",
                }}
              >
                <Box
                  component={"div"}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontWeight: "500",
                    fontSize: "40px",
                  }}
                >
                  <span style={{ color: "gray" }}>${PriceUpdateFunc}</span>
                </Box>
                <Box
                  component={"div"}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  <span style={{ color: "gray" }}>
                    * Center Stone Not Included
                  </span>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            component={"div"}
            className="make_it_personal_section"
            // style={{
            //   display:
            //     DesignListEng()[0]?.autocode === undefined ? "none" : "block",
            // }}
          >
            <Box component={"div"} style={{ marginTop: "40px" }}>
              <table border="0" cellspacing="0" cellpadding="0" width="100%">
                <tbody>
                  <tr height="40">
                    <td
                      width="40%"
                      style={{
                        background:
                          "linear-gradient(to right, white, rgba(230,239,246))",
                      }}
                    >
                      &nbsp;
                    </td>
                    <td
                      align="center"
                      style={{
                        background: "rgba(230,239,246)",
                      }}
                    >
                      <font style={{ fontSize: "20px", color: "#808080" }}>
                        MAKE IT PERSONAL!
                      </font>
                    </td>
                    <td
                      width="40%"
                      style={{
                        background:
                          "linear-gradient(to left, white, rgba(230,239,246))",
                      }}
                    >
                      &nbsp;
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p>
                  Engrave your Initials, Special Date, or Secret Message - up to
                  10 Characters
                </p>
              </div>
            </Box>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "40px",
                flexWrap: "wrap",
              }}
            >
              <Box>
                <Box
                  component={"div"}
                  style={{
                    display:
                      // DesignListEng()[0]?.Engraving === undefined ? "none" : "flex",
                      "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    component={"img"}
                    src={
                      reactMagnifyImageMemo()?.length
                        ? pdStore?.imagepath + reactMagnifyImageMemo()
                        : notFound
                    }
                    height={230}
                    width={230}
                    sx={{
                      paddingInline: "12px",
                    }}
                  />
                  <Box className="makeitpersonal">
                    <Box component={"div"} className="makeitpersonal-input">
                      <Box
                        component={"div"}
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <label>optional</label>
                        <input
                          type="text"
                          maxLength={10}
                          style={{
                            width: "350px",
                            height: "34px",
                            fontSize: "18px",
                            fontFamily: `${ringEngTF ? ringEngTF : ""}`,
                          }}
                          value={ringEngT}
                          onChange={(e) => setRingEngT(e.target.value)}
                        />
                      </Box>
                      <Box
                        component={"div"}
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          marginTop: "21px",
                        }}
                      >
                        <select
                          style={{
                            width: "350px",
                            height: "40px",
                            fontSize: "18px",
                          }}
                          value={ringEngTF}
                          onChange={(e) => setRingEngTF(e.target.value)}
                        >
                          <option value="Poppins" selected>
                            Poppins
                          </option>
                          <option value="Roboto">Roboto</option>
                          <option value="Lato">Lato</option>
                        </select>
                      </Box>
                    </Box>
                    <Box
                      component={"div"}
                      className="designEng"
                      style={{
                        marginTop: "10px",
                        fontWeight: "bold",
                        marginLeft: "10px",
                        fontSize: "18px",
                      }}
                    >
                      ${ringEngT ? EngravePrice()[0]?.Engraving : 0}
                    </Box>
                  </Box>
                </Box>
                <Box
                  component={"div"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "30px",
                    width: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "22px",
                      fontFamily: `${ringEngTF ? ringEngTF : ""}`,
                      marginTop: { xl: 10 },
                    }}
                    className="ringtext"
                  >
                    {ringEngT}
                  </Typography>
                </Box>
              </Box>
              {/* <Box
          component={"div"}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          className="band_Images"
        >
          <Box
            component={"img"}
            src={
              bandImg
                ? pdStore?.imagepath + bandImg
                : pdStore?.imagepath + similarband[0]?.MediumImagePath ??
                  notFound
            }
            height={230}
            width={230}
            sx={{
              paddingInline: "12px",
            }}
          />

          <Box
            component={"div"}
            sx={{ display: "flex", justifyContent: "center", gap: "60px" }}
          >
            <Box
              component={"div"}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>optional</label>
              <input
                type="text"
                style={{
                  width: "350px",
                  height: "34px",
                  fontSize: "18px",
                  fontFamily: `${bandEngTF ? bandEngTF : ""}`,
                }}
                value={bandEngT}
                onChange={(e) => setBandEngT(e.target.value)}
              />
            </Box>
            <Box
              component={"div"}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginTop: "21px",
              }}
            >
              <select
                style={{ width: "350px", height: "40px", fontSize: "18px" }}
                value={bandEngTF}
                onChange={(e) => setBandEngTF(e.target.value)}
              >
                <option value="cursive" selected>
                  cursive
                </option>
                <option value="fantasy">fantasy</option>
                <option value="serif">serif</option>
              </select>
            </Box>
          </Box>
          <Box component={"div"}>${bandEngT ? 25 : 0}</Box>
        </Box> */}
              <Box
                component={"div"}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "30px",
                  width: "100%",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontFamily: `${bandEngTF ? bandEngTF : ""}`,
                  }}
                >
                  {bandEngT}
                </Typography>
              </Box>
            </Box>
            <Box
              component={"div"}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "95%",
                paddingBottom: "35px",
                flexDirection: "column",
              }}
            >
              <Box
                component={"div"}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  fontWeight: "500",
                  fontSize: "40px",
                }}
              >
                <span style={{ color: "gray" }}>
                  Total : $
                  {
                    // DesignListEng()[0]?.autocode === undefined
                    //   ? "Not available"
                    //   :
                    PriceUpdateFunc +
                      // (bandEngT ? 25 : 0) +
                      // bandPrice +
                      (ringEngT ? EngravePrice()[0]?.Engraving : 0)
                  }
                </span>
              </Box>
              <Box
                component={"div"}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    height: "50px",
                    width: "230px",
                    backgroundColor: "#e5edf3",
                  }}
                  // disabled={
                  //   DesignListEng()[0]?.autocode === undefined ? true : false
                  // }
                  onClick={() => setOpen(true)}
                  // disabled={filterOutImage().length?false:true}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "black",
                    }}
                  >
                    Save this Ring
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Dialoag box */}

      <Dialog open={open} maxWidth="md">
        <DialogContent>
          <Box>
            <Box
              component={"div"}
              sx={{ display: "flex", justifyContent: "flex-end" }}
              onClick={() => {
                setOpen(false);
                setFlagRes(false);
                setFName("");
                setLName("");
                setEmail("");
                setPhone("");
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                X
              </Typography>
            </Box>
            <Box>
              <Box component={"div"} style={{ display: "flex" }}>
                <Box
                  component={"div"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "50%",
                    gap: "50px",
                  }}
                >
                  <Box component={"div"}>
                    <img
                      src={
                        reactMagnifyImageMemo()?.length
                          ? pdStore?.imagepath + reactMagnifyImageMemo()
                          : notFound
                      }
                      alt=""
                      style={{ height: "150px", width: "150px" }}
                    />
                  </Box>
                  {similarband.length > 0 && (
                    <Box component={"div"}>
                      <img
                        src={
                          bandImg
                            ? pdStore?.imagepath + bandImg
                            : pdStore?.imagepath +
                                similarband[0]?.MediumImagePath ?? notFound
                        }
                        alt="..."
                        style={{ height: "150px", width: "150px" }}
                      />
                    </Box>
                  )}
                </Box>
                <Box
                  component={"div"}
                  sx={{
                    display: "flex",
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column ",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "-30px",
                      }}
                    >
                      <hr />
                      {designListDesc()?.TitleLine}
                      <hr />
                    </div>

                    <div style={{ marginTop: "5px" }}>
                      Your Build Number: <b>{buildNumber()}</b>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                        marginTop: "12px",
                      }}
                    >
                      Finger Size:
                      <b>
                        {localItem?.ringsizecode !== ""
                          ? localItem?.ringsizecode?.charAt(0) +
                            "." +
                            localItem?.ringsizecode?.slice(1)
                          : "4.00"}
                      </b>
                    </div>
                  </Box>
                </Box>
              </Box>
            </Box>
            {flagRes ? (
              <>
                <Box
                  component="div"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "40px",
                  }}
                >
                  <Box>
                    <Typography>Email sent Successfully</Typography>
                    <Typography>Thank You!!</Typography>
                  </Box>
                </Box>
              </>
            ) : (
              <>
                {formLoader && (
                  <Box
                    sx={{
                      position: "absolute",
                      width: "97%",
                      height: "73%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "white",
                      opacity: 0.5,
                      zIndex: formLoader === true ? 1 : -1,
                    }}
                  >
                    <CircularProgress sx={{ color: "black" }} size={50} />
                  </Box>
                )}
                <div>
                  <Box
                    component={"div"}
                    style={{
                      margin: "8px 0px",
                      color: "red",
                      fontWeight: "bold",
                      marginLeft: "12px",
                      display: "flex",
                      justifyContent: "center",
                      height: "25px",
                    }}
                  >
                    {errorObj?.err}
                  </Box>
                  <Box component={"div"} className="form-box-1">
                    <Box
                      component={"div"}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <input
                        className="form-box-1-input"
                        placeholder="First Name *"
                        value={fName}
                        style={{ outlineColor: "black" }}
                        onChange={(e) => {
                          setFName(e.target.value);
                          setErrorObj({ label: "", err: "" });
                        }}
                      />
                    </Box>
                    <Box
                      component={"div"}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <input
                        className="form-box-1-input"
                        placeholder="Last Name *"
                        value={LName}
                        style={{ outlineColor: "black" }}
                        onChange={(e) => {
                          setLName(e.target.value);
                          setErrorObj({ label: "", err: "" });
                        }}
                      />
                    </Box>
                  </Box>
                  <Box component={"div"} className="form-box-1">
                    <Box
                      component={"div"}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <input
                        className="form-box-1-input"
                        placeholder="Company Name"
                        style={{ outlineColor: "black" }}
                      />
                    </Box>
                    <Box
                      component={"div"}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <input
                        className="form-box-1-input"
                        placeholder="Sales Representative"
                        value={salesRep}
                        style={{ outlineColor: "black" }}
                        onChange={(e) => setSalesRep(e.target.value)}
                      />
                    </Box>
                  </Box>
                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "30px 0px",
                    }}
                  >
                    <Box
                      component={"div"}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <input
                        className="form-box-1-input"
                        placeholder="Phone Number *"
                        value={phone}
                        style={{ outlineColor: "black" }}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          setErrorObj({ label: "", err: "" });
                        }}
                      />
                    </Box>
                    <Box
                      component={"div"}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <input
                        className="form-box-1-input"
                        placeholder="Zip Code"
                        style={{ outlineColor: "black" }}
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </Box>
                  </Box>

                  <Box
                    component={"div"}
                    // className="form-box-1-input"
                    style={{
                      display: "flex",
                      width: "100%",
                      marginBottom: "30px",
                    }}
                  >
                    <input
                      // style={{
                      //     border:'none', height: "35px", width: "50%", borderRadius: "8px", fontSize: "18px", paddingRight: "92px", paddingLeft: "15px", outlineColor: "black", marginBottom: "30px",
                      //   }}
                      className="form-box-1-input"
                      style={{ outlineColor: "black" }}
                      placeholder="Enter Email *"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorObj({ label: "", err: "" });
                      }}
                    />
                  </Box>
                  {/* 
                  <Box component={"div"} sx={{ display: "flex", justifyContent: "center" }} >
                      <input 
                      className="form-box-1-input" placeholder="Zip Code" style={{ outlineColor: "black" }} 
                      value={zip} onChange={(e) => setZip(e.target.value)} 
                      
                      />
                    </Box> */}

                  <Box
                    component={"div"}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      placeholder="Notes"
                      multiline
                      rows={3}
                      maxRows={4}
                      sx={{
                        width: "100%",
                        borderRadius: "8px",
                        fontSize: "18px",
                        outlineColor: "black",
                      }}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </Box>
                  <Box component={"div"} sx={{ margin: "12px 0px" }}>
                    <Box component={"div"} style={{ display: "flex" }}>
                      <input
                        name="salesreprentative"
                        id="salesId"
                        class="form-check-input mx-1"
                        type="checkbox"
                        checked={spChecked}
                        onChange={(e) => setSpChecked(e.target.checked)}
                      />
                      <label>
                        <Typography onClick={() => setSpChecked(!spChecked)}>
                          Please have a sales representative contact me
                        </Typography>
                      </label>
                    </Box>
                  </Box>
                  <Typography sx={{ margin: "12px 0px", color: "gray" }}>
                    By clicking Save This Ring you agree to be contacted by a
                    sales representative to assist with any inquiries about this
                    item.
                  </Typography>
                  <Box
                    component={"div"}
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="contained"
                      onClick={handelSubmit}
                      style={{
                        width: "148.34",
                        height: "36.5",
                        backgroundColor: "#e5edf3",
                        color: "black",
                      }}
                    >
                      {false ? (
                        <CircularProgress
                          sx={{ color: "black", padding: "0px 36px" }}
                          size="25px"
                        />
                      ) : (
                        "Save this Ring"
                      )}
                    </Button>
                  </Box>
                </div>
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Details;
