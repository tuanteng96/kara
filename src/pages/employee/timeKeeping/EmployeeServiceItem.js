import React from "react";
import PropTypes from "prop-types";
import {
  Actions,
  ActionsButton,
  ActionsGroup,
  ActionsLabel,
  Button,
  Link,
  PhotoBrowser,
  Swiper,
  SwiperSlide,
  Tab,
  Tabs,
} from "framework7-react";
import moment from "moment";
import "moment/locale/vi";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
moment.locale("vi");

EmployeeServiceItem.propTypes = {};

function EmployeeServiceItem({
  item,
  checkStatus,
  handleDetail,
  handleHistory,
  handleDiary,
}) {
  const [tabCurrent, setTabCurrent] = useState("tab-1");
  const refPhotoWeb = useRef();
  const refPhotoReal = useRef();
  const [PhotoWeb, setPhotoWeb] = useState([
    "https://chiasetainguyen.com/upload-file/lang-hoa-8-3-dep-15c6dfaa387871.png",
    "https://img1.kienthucvui.vn/uploads/2020/03/17/cac-mau-cam-hoa-cam-chuong-dep_123225797.jpg",
    "https://img1.kienthucvui.vn/uploads/2020/03/17/hinh-anh-mau-cam-hoa-dep-nhat_123226547.jpg",
  ]);
  const [PhotoReal, setPhotoReal] = useState([
    "https://chiasetainguyen.com/upload-file/lang-hoa-8-3-dep-135c6e002eb823d.jpg",
    "https://img4.thuthuatphanmem.vn/uploads/2020/02/13/50-mau-cam-hoa-nghe-thuat-tuyet-dep_024315448.jpg",
  ]);

  return (
    <>
      <div className="bg-white position-relative">
        <div className="position-absolute zindex-5 top-10px left-10px employee-tab-head">
          <Link
            className={`p-10px ${tabCurrent === "tab-1" && "active"}`}
            onClick={() => setTabCurrent("tab-1")}
          >
            Ảnh Website
          </Link>
          <Link
            className={`p-10px ${tabCurrent === "tab-2" && "active"}`}
            onClick={() => setTabCurrent("tab-2")}
          >
            Ảnh thực tế{" "}
          </Link>
        </div>
        {tabCurrent === "tab-1" && (
          <div className="position-relative">
            <Swiper
              navigation
              params={{
                autoHeight: true,
              }}
            >
              {PhotoWeb &&
                PhotoWeb.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={item}
                      onClick={() => refPhotoWeb?.current?.open(index)}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
            <PhotoBrowser
              photos={PhotoWeb}
              ref={refPhotoWeb}
              popupCloseLinkText="Đóng"
            />
          </div>
        )}
        {tabCurrent === "tab-2" && (
          <div>
            <Swiper
              navigation
              params={{
                autoHeight: true,
              }}
            >
              {PhotoReal &&
                PhotoReal.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={item}
                      onClick={() => refPhotoReal?.current?.open(index)}
                    />
                  </SwiperSlide>
                ))}
            </Swiper>
            <PhotoBrowser
              photos={PhotoReal}
              ref={refPhotoReal}
              popupCloseLinkText="Đóng"
            />
          </div>
        )}
      </div>
      <div className="item">
        <h3>
          {checkStatus(item.Status)}
          {item.ProdTitle}
        </h3>
        <ul>
          <li>
            <span>Khách hàng : </span>
            <span className="text-capitalize">{item.member.FullName}</span>
          </li>
          <li>
            <span>Ngày đặt lịch : </span>
            <span className="font-number">
              {moment(item.BookDate).format("L")}
            </span>
          </li>
          <li>
            <span>Giờ đặt lịch : </span>
            <span className="font-number">
              {moment(item.BookDate).format("LT")}
            </span>
          </li>
          {item.Desc && (
            <li>
              <span>Ghi chú : </span>
              <span>{item.Desc}</span>
            </li>
          )}

          {/* <li>
                                <span>Số phút : </span>
                                <span>{item.RootMinutes}p/Ca</span>
                              </li> */}
        </ul>
        <Button
          noClassName
          raised={true}
          actionsOpen={`#actions-group-${item.ID}`}
        ></Button>
      </div>
      <Actions className="actions-custom" id={`actions-group-${item.ID}`}>
        <ActionsGroup>
          <ActionsLabel>{item.Title}</ActionsLabel>
          <ActionsButton onClick={() => handleDetail(item)}>
            Xem chi tiết
          </ActionsButton>
          <ActionsButton onClick={() => handleDiary(item)}>
            Nhật ký
          </ActionsButton>
          {/* <ActionsButton
                                onClick={() => this.handleSchedule(item)}
                              >
                                Lịch trình
                              </ActionsButton> */}
          {!window?.GlobalConfig?.APP?.Staff?.hideHistoryMember && (
            <ActionsButton onClick={() => handleHistory(item)}>
              Lịch sử khách hàng
            </ActionsButton>
          )}
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton color="red">Đóng</ActionsButton>
        </ActionsGroup>
      </Actions>
    </>
  );
}

export default EmployeeServiceItem;