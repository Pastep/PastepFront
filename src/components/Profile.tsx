import "../styles/global/profile.scss";

import { Paste } from "./Paste";

export function Profile() {
  return (
    <div className="profile">
      <div className="profile__wrapper">
        <div className="profile__header">
          <div className="header__right">
            <img width="93" height="93" src="./images/werdox.png" alt="" />
            <div className="right__info">
              <div className="name__wrapper">
                <h2>بوووووعذار دِ عباس</h2>
                <div className="badges">
                  <div className="badges__wrapper">
                    <div className="badge badge--purple">
                      <h4>ادمین</h4>
                    </div>
                  </div>
                </div>
              </div>
              <h3>پرنده میگیرم و پرنده میفروشم دونه ای ۱ پرنده قیمیت میگیرم</h3>
            </div>
          </div>
          <div className="header__left">
            <div className="left__followers">
              <div className="followers__count">۱۲+</div>
              <img width="25" height="25" src="./images/werdox.png"></img>
              <img width="25" height="25" src="./images/werdox.png"></img>
            </div>
            <button className="left__follow">دنبال کردن</button>
          </div>
        </div>
        <div className="profile__sections">
          <div className="sections__wrapper">
            <div className="section section--selected">آخرین پُست ها</div>
            <div className="section">معروف ترین پیست ها</div>
            <div className="section">دنبال کرده ها</div>
            <div className="section">دنبال شوندگان</div>
          </div>
          <div className="sections__divider"></div>
        </div>
        <div className="profile__pastes">
          <div className="pastes__wrapper">
            <Paste
              userName="Werdox"
              userLocation="شیراز | ایران"
              profilePic="./images/werdox.png"
              code="class mamad extends jafar.component class mamad extends jafar.component class mamad extends jafar.component"
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
    </div>
  );
}