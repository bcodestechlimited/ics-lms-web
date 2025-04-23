import { NumberTickerComp } from "./number-ticker-comp";

const styles = {
  list: `flex flex-col items-center justify-center w-full`,
  counter: `flex items-center gap-x-1`,
};
export default function AboutUsCard() {
  return (
    <div className="flex gap-x-[15px] w-full">
      <div className="bg-[#134587] w-full h-[200px]">
        <div className="flex w-full text-white divide-x h-full">
          <div className={`${styles.list} border-b`}>
            <div className={styles.counter}>
              <NumberTickerComp value={45} />
              <p className="text-6xl">+</p>
            </div>
            <span>Courses</span>
          </div>
          <div className={`${styles.list} border-b w-full`}>
            <div className={styles.counter}>
              <NumberTickerComp value={100} />
              <p className="text-6xl">+</p>
            </div>
            <span>Videos</span>
          </div>
          <div className={`${styles.list} border-b`}>
            <div className={styles.counter}>
              <NumberTickerComp value={500} />
              <p className="text-6xl">+</p>
            </div>
            <span>Hours</span>
          </div>
          <div className={`${styles.list}`}>
            <div className={styles.counter}>
              <NumberTickerComp value={120} />
              <p className="text-6xl">+</p>
            </div>
            <span>Students</span>
          </div>
        </div>
      </div>
    </div>
  );
}
