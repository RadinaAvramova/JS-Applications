
import { shoeTemplate } from "../shared/shoeTemplate";

export const searchTemplate = (shoes, submitHandler, isUserLoggedIn) => html`
<section id="search">
  <h2>Search by Brand</h2>

  <form class="search-wrapper cf" @submit=${submitHandler}>
    <input
      id="#search-input"
      type="text"
      name="search"
      placeholder="Search here..."
      required
      .value=${searchValue}
    />
    <button type="submit">Search</button>
  </form>

  <h3>Results:</h3>
  <div id="search-container">
    ${shoes.length > 0
        ? html`
        <ul class="card-wrapper">
            ${shoes.map(s => shoeTemplate(s, isUserLoggedIn))}
        </ul>`
        :html`<h2>There are no items added yet.</h2>`
    }
    </div>
</section>`

