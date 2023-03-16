const typeDescription = (type) => {
    const TYPES = {
      INDIVIDUAL: "Индивидуальный предприниматель",
      LEGAL: "Организация",
    };
    return TYPES[type];
  };
  
  const join = (arr, separator = ", ") => {
    return arr.filter(Boolean).join(separator);
  };
  
  
  const showSuggestion = (suggestion) => {
    console.log(suggestion);
    const data = suggestion.data;
    if (!data) {
      return;
    }
  
    const typeEl = document.getElementById("type");
    typeEl.textContent = `${typeDescription(data.type)} (${data.type})`;
  
    const nameShortEl = document.getElementById("name_short");
    const nameFullEl = document.getElementById("name_full");
    if (data.name) {
      nameShortEl.value = data.name.short_with_opf || "";
      nameFullEl.value = data.name.full_with_opf || "";
    } else {
      nameShortEl.value = "";
      nameFullEl.value = "";
    }
  
    const innKppEl = document.getElementById("inn_kpp");
    innKppEl.value = join([data.inn, data.kpp], " / ");
  
    const addressEl = document.getElementById("address");
    if (data.address) {
      let address = "";
      if (data.address.data.qc === "0") {
        address = join([data.address.data.postal_code, data.address.value]);
      } else {
        address = data.address.data.source;
      }
      addressEl.value = address;
    } else {
      addressEl.value = "";
    }
  };
  
  const checkInput = (value) => {
      const inputValue = value;
      if (!inputValue) {
          return;
      }
        
      const url = `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party`;
      const token = 'Your token'
      const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
      };
      const payload = {
          query: inputValue,
          count: 5,
          from_bound: {
          value: "party",
          },
          to_bound: {
          value: "party",
          },
      };
      
      fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
      })
          .then((response) => response.json())
          .then((data) => showSuggestion(data.suggestions[0]))
          .catch((error) => console.error(error));
  }
  