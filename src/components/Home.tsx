import React from "react";
import "../styles/global/home.scss";

import { Paste } from "./Paste";

export function Home() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="code-type__wrapper flex">
          <div className="code-type__item selected">کد های کوتاه</div>
          <div className="code-type__item">کد های برگزیده</div>
          <div className="code-type__item">فرانت اند</div>
          <div className="code-type__item">بک اند</div>
        </div>
      </div>
      <div className="pastes">
        <div className="pastes__wrapper">
          <Paste
            userName="Werdox"
            userLocation="شیراز | ایران"
            profilePic="./images/werdox.png"
            code="class mamad extends jafar.component class mamad extends jafar.component class mamad extends jafar.componentfffffffffffffffffffffffffff"
            title="یک کلاس در تایپ اسکریپت"
            description="پرنده ها بال میزنند و آسمان را تماشا میکنند. ناگهان پرنده ای پر
            میزند و دیگر آسمان را تماشا نمیکند!"
          />
          <Paste
            userName="Werdox2"
            userLocation="شیراز | ایران"
            profilePic="./images/werdox.png"
            code="class mamad extends jafar.component class mamad extends jafar.component class mamad extends jafar.component"
            title="یک کلاس در تایپ اسکریپت"
            description="پرنده ها بال میزنند و آسمان را تماشا میکنند. ناگهان پرنده ای پر
            میزند و دیگر آسمان را تماشا نمیکند!"
          />
          <Paste
            userName="Werdox3"
            userLocation="شیراز | ایران"
            profilePic="./images/werdox.png"
            code="class mamad extends jafar.component class mamad extends jafar.component class mamad extends jafar.component"
            title="یک کلاس در تایپ اسکریپت"
            description="پرنده ها بال میزنند و آسمان را تماشا میکنند. ناگهان پرنده ای پر
            میزند و دیگر آسمان را تماشا نمیکند!"
          />
          <Paste
            userName="Werdox4"
            userLocation="شیراز | ایران"
            profilePic="./images/werdox.png"
            code="class mamad extends jafar.component class mamad extends jafar.component class mamad extends jafar.component"
            title="یک کلاس در تایپ اسکریپت"
            description="پرنده ها بال میزنند و آسمان را تماشا میکنند. ناگهان پرنده ای پر
            میزند و دیگر آسمان را تماشا نمیکند!"
          />
          <Paste
            userName="Werdox5"
            userLocation="شیراز | ایران"
            profilePic="./images/werdox.png"
            code="class mamad extends jafar.component class mamad extends jafar.component class mamad extends jafar.component"
            title="یک کلاس در تایپ اسکریپت"
            description="پرنده ها بال میزنند و آسمان را تماشا میکنند. ناگهان پرنده ای پر
            میزند و دیگر آسمان را تماشا نمیکند!"
          />
          <Paste
            userName="Werdox6"
            userLocation="شیراز | ایران"
            profilePic="./images/werdox.png"
            code="class mamad extends jafar.component class mamad extends jafar.component class mamad extends jafar.component"
            title="یک کلاس در تایپ اسکریپت"
            description="پرنده ها بال میزنند و آسمان را تماشا میکنند. ناگهان پرنده ای پر
            میزند و دیگر آسمان را تماشا نمیکند!"
          />
        </div>
      </div>
    </div>
  );
}
