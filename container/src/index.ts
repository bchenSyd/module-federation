// need to do it this way at applicaiton entry point
// to make module load NOT eager;
// otherwise we won't be able to put modules to shared scope
// due to the 'Shared module is not available for eager consumption' error (which is self-explaining in error name itself)
import('./bootstrap') ; // async call; make **all** modules  NOT eager loaded (i.e. lazy loaded)