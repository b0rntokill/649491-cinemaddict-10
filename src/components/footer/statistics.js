const getFilmTotalFormat = (number) => {
  let thousands = Math.trunc((number / 1000));
  const lessThousand = number % 1000;
  return thousands ? `${thousands} ${lessThousand}` : `${lessThousand}`;
};

const createFooterStatisticsTemplate = (card) => {
  const filmTotal = getFilmTotalFormat(card.length);
  return `<section class="footer__statistics">
            <p>${filmTotal} movies inside</p>
          </section>`;
};

export {createFooterStatisticsTemplate};
