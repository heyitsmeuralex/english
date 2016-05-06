module.exports = (tree, dev) => {
  if(dev) {
    console.log('Amount of results:', tree.length)
    console.log('Results:'); console.dir(tree, {depth:null})
  }
}