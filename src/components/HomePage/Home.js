import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import notFound from "../../assets/notImage.png";
import "./HomePage.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = ({
  pdStore,
  parentList,
  imageData,
  priceData,
  searchValue,
  setSearchValue,
  designList,
}) => {
  // <CircularProgress sx={{ color: "black",padding:"0px 36px"}} size='25px' padding = "148.34 36.5"/>

  let [loader, setLoader] = useState(false);

  let navigate = useNavigate();

  let parentData = parentList?.pdstore;

  console.log("pdStore", pdStore);
  console.log("parentList", parentList?.pdstore);
  console.log("imageData", imageData);
  console.log("priceData", priceData);
  console.log("designList", designList);

  let searchtext = useCallback(() => {
    let n = 16;
    if (searchValue.length === n) {
      return searchValue?.slice(0, n / 2);
    }
    if (searchValue.length === n - 1) {
      return searchValue?.slice(0, (n - 1) / 2);
    } else {
      return "";
    }
  }, [searchValue]);

  let findDesign = useCallback(() => {
    let findValue = designList.filter((y) => y.designno === searchtext());
    return findValue;
  }, [designList, searchtext]);

  // useEffect(()=>{
  //    if(pdStore.length>0 && parentList.length>0 ){
  //     setLoader(false)
  //    }
  // },[pdStore,parentList])

  const parentImagesData = () => {
    let images = [];
    let result = [];
    let datawithprice = [];

    //finding the same designno metalcolorname and then added new property "image" to parentList
    parentData?.map((data) =>
      imageData?.map((data1) => {
        if (
          data?.designno === data1?.designno &&
          data?.metalcolorname === data1?.colorname &&
          data1?.isdefault === "1"
        ) {
          images.push(data1);
        }
      })
    );

    parentData?.map((obj1) =>
      images?.map((obj2) => {
        if (obj1.designno === obj2.designno) {
          return result.push({ ...obj1, ["image"]: obj2["imagepath"] });
        }
      })
    );

    //finding the not matched data to push them or merged them with matched data to create a new array of parentList
    // with "image" key to loop over them and then

    let notmatchdata = parentData?.filter(
      (arr1) => !result.some((arr2) => arr1.designno === arr2.designno)
    );

    // sorting the data
    let sortData = result.concat(notmatchdata).sort((a, b) => {
      if (
        Number(a["designno"].match(/(\d+)/)[0]) >
        Number(b["designno"].match(/(\d+)/)[0])
      ) {
        return 1;
      }
      return -1;
    });

    console.log("sortData", sortData);
    console.log("dataChecking", priceData);
    // filter out the data to add new key in price from priceData

    let priceFilter = priceData?.filter((arr1) =>
      sortData.some(
        (arr2) =>
          arr1.A === arr2.autocode && arr2.metalpurity === arr1.D.split(" ")[1]
      )
    );

    sortData?.map((obj1) =>
      priceFilter?.map((obj2) => {
        if (obj1.autocode === obj2.A) {
          return datawithprice.push({ ...obj1, ["price"]: obj2["E"] });
        }
      })
    );

    /*
       find the min price among the similiar data of parentlist which has diffrent price but same autocode
      */
    let separatedData = {};
    datawithprice?.forEach((item) => {
      if (!separatedData[item.autocode]) {
        separatedData[item.autocode] = [];
      }
      separatedData[item.autocode].push(item);
    });

    let minPriceData = {};

    Object.keys(separatedData).map((id) => {
      let group = separatedData[id];
      let minPriceObject = group.reduce(
        (min, current) =>
          parseInt(current.price) > parseInt(min.price) ? current : min,
        group[0]
      );
      minPriceData[id] = minPriceObject;
    });

    let minPriceArray = Object.values(minPriceData);

    console.log("priceFilter", priceFilter);

    return minPriceArray;
  };

  const handelSearch = () => {
    if (searchValue.length === 0) {
      toast.error("Not Valid Design No. !!!!");
      return;
    } else if (
      searchValue.length > 16 ||
      searchValue.length <= 14 ||
      findDesign().length === 0
    ) {
      toast.error("Design Not found!!!");
      return;
    } else {
      navigate("/details", { state: { searchValue } });
    }
  };

  const handelLocalstorageandNavigate = useCallback(
    (ringdata) => {

      
      Cookies.set("selectedRingData", JSON.stringify(ringdata), {
        expires: 365,
      });
      localStorage.setItem("selectedRingData", JSON.stringify(ringdata));
      //  let binData=btoa(JSON.stringify(ringdata))
      // console.log("ringdata",`${ringdata.designno}${ringdata.metalpurity}${ringdata.metalcolorcode}${ringdata.ringsizecode}`);
      // navigate(`/details/${ringdata.designno}${ringdata.metalpurity}${ringdata.metalcolorcode}${ringdata.ringsizecode}`,{state:'prev'})
      navigate(`/details`, { state: "prev" });
    },
    [navigate]
  );

  useEffect(() => {
    // if(!parentList?.pdstore?.length){
    if (!parentImagesData()[parentImagesData().length - 1]?.image?.length) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [parentImagesData]);

  console.log(
    "parentImagesData",
    parentImagesData()[parentImagesData().length - 1]?.image?.length
  );


  const handelkeypress = (event) =>{
    if (event.key === 'Enter') {
        handelSearch();
    }
  }

  return (
    <>
      {loader && (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            opacity: 0.5,
          }}
        >
          <CircularProgress sx={{ color: "black" }} size={50} />
        </Box>
      )}

      <Box>
        <Box component={"div"} className="banner_image_container">
          <Box
            component={"img"}
            src={pdStore?.banner}
            className="banner_image"
          />
        </Box>
        {parentImagesData()[parentImagesData().length - 1]?.image?.length && (
          <Box
            component={"div"}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              margin: "30px 15px",
              position: "relative",
              zIndex: !parentList?.pdstore?.length ? -1 : 1,
            }}
          >
            <input
              style={{
                border: "2px solid gray",
                outlineColor: "gray",
                height: "35px",
                maxWidth: "350px",
                width: "100%",
                borderRadius: "8px",
                fontSize: "18px",
                paddingRight: "92px",
                paddingLeft: "15px",
              }}
              placeholder="search build number"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handelkeypress}
            />
            <Button
              variant="contained"
              style={{
                height: 40.5,
                backgroundColor: "#c8c6c8",
                color: "black",
              }}
              onClick={handelSearch}
            >
              Search
            </Button>
          </Box>
        )}
        <Box component={"div"} className="ring_container">
          <Box component={"div"} className="ring_container_header">
            {parentImagesData()?.map((ringsList) => (
              <Box
                component={"div"}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  width:'24%',
                  margin:'0px',
                  padding:'0 0.5%' 
                }}
                onClick={() => handelLocalstorageandNavigate(ringsList)}
              >
                <Box
                  component="img"
                  className="ring_images_tag"
                  src={
                    ringsList?.hasOwnProperty("image")
                      ? pdStore?.imagepath + ringsList?.image
                      : notFound
                  }
                  alt="ring_img"
                />

                <Stack
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  className="box-text"
                >
                  <Typography className="box-text colorStones">{ringsList?.design_status}</Typography>
                  {/* <Typography>${ringsList?.price}</Typography> */}
                  <Typography className="box-text box_Price">
                    ${Math.ceil(ringsList?.price * 2.2 - 10)}
                  </Typography>
                  <Typography sx={{ fontWeight: 600, fontSize: 20 }} className="box-text box_design">
                    {ringsList?.designno}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
