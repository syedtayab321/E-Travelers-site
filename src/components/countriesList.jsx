const countryOptions = [
  { value: "Afghanistan", label: "🇦🇫 Afghanistan" },
  { value: "Albania", label: "🇦🇱 Albania" },
  { value: "Algeria", label: "🇩🇿 Algeria" },
  { value: "Andorra", label: "🇦🇩 Andorra" },
  { value: "Angola", label: "🇦🇴 Angola" },
  { value: "Argentina", label: "🇦🇷 Argentina" },
  { value: "Armenia", label: "🇦🇲 Armenia" },
  { value: "Australia", label: "🇦🇺 Australia" },
  { value: "Austria", label: "🇦🇹 Austria" },
  { value: "Azerbaijan", label: "🇦🇿 Azerbaijan" },
  { value: "Bahrain", label: "🇧🇭 Bahrain" },
  { value: "Bangladesh", label: "🇧🇩 Bangladesh" },
  { value: "Belarus", label: "🇧🇾 Belarus" },
  { value: "Belgium", label: "🇧🇪 Belgium" },
  { value: "Belize", label: "🇧🇿 Belize" },
  { value: "Benin", label: "🇧🇯 Benin" },
  { value: "Bhutan", label: "🇧🇹 Bhutan" },
  { value: "Bolivia", label: "🇧🇴 Bolivia" },
  { value: "Bosnia & Herzegovina", label: "🇧🇦 Bosnia & Herzegovina" },
  { value: "Botswana", label: "🇧🇼 Botswana" },
  { value: "Brazil", label: "🇧🇷 Brazil" },
  { value: "Bulgaria", label: "🇧🇬 Bulgaria" },
  { value: "Burkina Faso", label: "🇧🇫 Burkina Faso" },
  { value: "Burundi", label: "🇧🇮 Burundi" },
  { value: "Cambodia", label: "🇰🇭 Cambodia" },
  { value: "Cameroon", label: "🇨🇲 Cameroon" },
  { value: "Canada", label: "🇨🇦 Canada" },
  { value: "Chad", label: "🇹🇩 Chad" },
  { value: "Chile", label: "🇨🇱 Chile" },
  { value: "China", label: "🇨🇳 China" },
  { value: "Colombia", label: "🇨🇴 Colombia" },
  { value: "Congo", label: "🇨🇬 Congo" },
  { value: "Costa Rica", label: "🇨🇷 Costa Rica" },
  { value: "Croatia", label: "🇭🇷 Croatia" },
  { value: "Cuba", label: "🇨🇺 Cuba" },
  { value: "Cyprus", label: "🇨🇾 Cyprus" },
  { value: "Czechia", label: "🇨🇿 Czechia" },
  { value: "Denmark", label: "🇩🇰 Denmark" },
  { value: "Djibouti", label: "🇩🇯 Djibouti" },
  { value: "Dominican Republic", label: "🇩🇴 Dominican Republic" },
  { value: "Ecuador", label: "🇪🇨 Ecuador" },
  { value: "Egypt", label: "🇪🇬 Egypt" },
  { value: "El Salvador", label: "🇸🇻 El Salvador" },
  { value: "Estonia", label: "🇪🇪 Estonia" },
  { value: "Ethiopia", label: "🇪🇹 Ethiopia" },
  { value: "Finland", label: "🇫🇮 Finland" },
  { value: "France", label: "🇫🇷 France" },
  { value: "Georgia", label: "🇬🇪 Georgia" },
  { value: "Germany", label: "🇩🇪 Germany" },
  { value: "Ghana", label: "🇬🇭 Ghana" },
  { value: "Greece", label: "🇬🇷 Greece" },
  { value: "Guatemala", label: "🇬🇹 Guatemala" },
  { value: "Haiti", label: "🇭🇹 Haiti" },
  { value: "Honduras", label: "🇭🇳 Honduras" },
  { value: "Hungary", label: "🇭🇺 Hungary" },
  { value: "Iceland", label: "🇮🇸 Iceland" },
  { value: "India", label: "🇮🇳 India" },
  { value: "Indonesia", label: "🇮🇩 Indonesia" },
  { value: "Iran", label: "🇮🇷 Iran" },
  { value: "Iraq", label: "🇮🇶 Iraq" },
  { value: "Ireland", label: "🇮🇪 Ireland" },
  { value: "Israel", label: "🇮🇱 Israel" },
  { value: "Italy", label: "🇮🇹 Italy" },
  { value: "Japan", label: "🇯🇵 Japan" },
  { value: "Jordan", label: "🇯🇴 Jordan" },
  { value: "Kazakhstan", label: "🇰🇿 Kazakhstan" },
  { value: "Kenya", label: "🇰🇪 Kenya" },
  { value: "South Korea", label: "🇰🇷 South Korea" },
  { value: "Kuwait", label: "🇰🇼 Kuwait" },
  { value: "Laos", label: "🇱🇦 Laos" },
  { value: "Latvia", label: "🇱🇻 Latvia" },
  { value: "Lebanon", label: "🇱🇧 Lebanon" },
  { value: "Libya", label: "🇱🇾 Libya" },
  { value: "Lithuania", label: "🇱🇹 Lithuania" },
  { value: "Luxembourg", label: "🇱🇺 Luxembourg" },
  { value: "Malaysia", label: "🇲🇾 Malaysia" },
  { value: "Mexico", label: "🇲🇽 Mexico" },
  { value: "Morocco", label: "🇲🇦 Morocco" },
  { value: "Netherlands", label: "🇳🇱 Netherlands" },
  { value: "New Zealand", label: "🇳🇿 New Zealand" },
  { value: "Nigeria", label: "🇳🇬 Nigeria" },
  { value: "Norway", label: "🇳🇴 Norway" },
  { value: "Pakistan", label: "🇵🇰 Pakistan" },
  { value: "Peru", label: "🇵🇪 Peru" },
  { value: "Philippines", label: "🇵🇭 Philippines" },
  { value: "Poland", label: "🇵🇱 Poland" },
  { value: "Portugal", label: "🇵🇹 Portugal" },
  { value: "Qatar", label: "🇶🇦 Qatar" },
  { value: "Romania", label: "🇷🇴 Romania" },
  { value: "Russia", label: "🇷🇺 Russia" },
  { value: "Saudi Arabia", label: "🇸🇦 Saudi Arabia" },
  { value: "Singapore", label: "🇸🇬 Singapore" },
  { value: "South Africa", label: "🇿🇦 South Africa" },
  { value: "Spain", label: "🇪🇸 Spain" },
  { value: "Sweden", label: "🇸🇪 Sweden" },
  { value: "Switzerland", label: "🇨🇭 Switzerland" },
  { value: "Thailand", label: "🇹🇭 Thailand" },
  { value: "Turkey", label: "🇹🇷 Turkey" },
  { value: "Ukraine", label: "🇺🇦 Ukraine" },
  { value: "UAE", label: "🇦🇪 UAE" },
  { value: "United Kingdom", label: "🇬🇧 United Kingdom" },
  { value: "United States", label: "🇺🇸 United States" },
  { value: "Vietnam", label: "🇻🇳 Vietnam" },
  { value: "Yemen", label: "🇾🇪 Yemen" },
  { value: "Zimbabwe", label: "🇿🇼 Zimbabwe" },
];

export default countryOptions;
