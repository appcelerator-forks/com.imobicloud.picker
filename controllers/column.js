var args = arguments[0] || {},
	selectedIndex;

init();
function init() {
	var items = [],
		template = args.template || 'title';
		
	for(var i=0,ii=args.rows.length; i<ii; i++){
		var row = args.rows[i];
	  	items.push({
	  		template: template,
	  		properties: { itemId: row.id },
	  		icon: { image: row.icon },
	  		title: { text: row.title }
	  	});
	};
	
	$.addClass($.list, args.classes);
	$.list.sections = [Ti.UI.createListSection({ items: items })];
};

function postlayout(e) {
	$.list.removeEventListener('postlayout', postlayout);
  	selectedIndex = args.selectedRow || 0;
	updateUI(selectedIndex, true, false);
}

function columnClick(e) {
	setSelectedRow(e.itemIndex, true);
}

function reset() {
  	if (selectedIndex != null) {
  		updateUI(selectedIndex, false, false);
  		
	  	selectedIndex = null;
	}
}

function setSelectedRow(rowIndex, animated) {
  	if (selectedIndex === rowIndex) { return; }
  	
  	reset();
	
	updateUI(rowIndex, true, animated);
	
  	selectedIndex = rowIndex;
}

function updateUI(rowIndex, isSelected, isAnimated) {
	var section = $.list.sections[0];
	if (section) {
		var item = section.getItemAt(rowIndex);
		if (item) {
			item.properties.backgroundColor = isSelected ? '#269ab4' : 'transparent';
	  		section.updateItemAt(rowIndex, item, { animated: false });
		}
	}
	
	if (isSelected) {
		$.trigger('change', {
	  		columnIndex: args.columnIndex,
	  		rowIndex: rowIndex,
	  		value: args.rows[rowIndex]
	  	});
	}
}

//

exports.unload = function() {
	args = null;
};

exports.reset = reset;

exports.setSelectedRow = setSelectedRow;

exports.getSelectedRow = function() {
	return args.rows[selectedIndex];
};